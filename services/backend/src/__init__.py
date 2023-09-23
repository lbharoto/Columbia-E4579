import os

from flask import Flask
from flask_admin import Admin
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.middleware.proxy_fix import ProxyFix

# instantiate the extensions
db = SQLAlchemy()
cors = CORS()
bcrypt = Bcrypt()
admin = Admin(template_mode="bootstrap3")


def create_app(script_info=None):
    # instantiate the app
    app = Flask(__name__)

    def before_first_request_checks():
        from sqlalchemy import func
        from src.api.engagement.models import Engagement
        from src.api.content.models import Content, GeneratedContentMetadata
        from src.api.users.models import User
        for table in [Engagement, Content, GeneratedContentMetadata, User]:
            if db.engine.dialect.has_table(db.engine, table.__tablename__):
                print(f"Table '{table.__tablename__}' exists.")
            else:
                raise ValueError(f"table {table} does not exist")
            row_count = db.session.query(func.count(table.id)).scalar()
            if row_count > 0:
                print(f"Table {table.__tablename__} has {row_count} rows")
            else:
                raise ValueError(f"no rows for {table.__tablename__}")

    def before_first_request_instantiate():
        from src.data_structures.approximate_nearest_neighbor import (
            instantiate,
            read_data,
        )
        from src.data_structures.approximate_nearest_neighbor.two_tower_ann import (
            instantiate_indexes,
        )

        print("INSTANTIATING ALL TEAMS ANNs")
        instantiate_indexes()
        print("INSTANTIATED INDEXES FOR TEAMS")

        print("READING DATA FOR ANN INDEX, will only run this once")
        read_data()
        print("INSTANTIATING ANN INDEX")
        instantiate(0.9)
        print("INSTANTIATED ANN INDEX")

        print("instantiating user based collabertive filter objects")
        teams = ["alpha", "beta", "charlie", "delta", "echo", "foxtrot", "golf"]
        for team in teams:
            print(f"doing {team}")
            module_path = f"src.data_structures.user_based_recommender.{team}.UserBasedRecommender"
            __import__(module_path, fromlist=['recommender']).recommender # import to initialize the singleton
            print(f"done {team}")
        print("instantiated collabertive filter object for teams")

    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)

    # set config
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # set up extensions
    db.init_app(app)
    cors.init_app(app, resources={r"*": {"origins": "*"}})
    bcrypt.init_app(app)
    if os.getenv("FLASK_ENV") == "development":
        admin.init_app(app)

    # register api
    from src.api import api

    api.init_app(app)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    with app.app_context():
        db.create_all() # only create tables if they don't exist
        before_first_request_checks()
        before_first_request_instantiate()
        print("FULLY DONE INSTANTIATION USE THE APP")
    return app
