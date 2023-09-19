import React, { useContext } from "react";
import { DarkModeContext } from '../../components/darkmode/DarkModeContext';

const About = () => {
  const { darkMode } = useContext(DarkModeContext);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '2em',
      color: darkMode ? '#f5f5f5' : '#333',
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
    },
    title: {
      borderBottom: darkMode ? '2px solid #f5f5f5' : '2px solid #333',
      paddingBottom: '0.5em',
      color: darkMode ? '#f5f5f5' : '#333',
    },
    content: {
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1.5em',
      color: darkMode ? '#f5f5f5' : '#333',
    },
    subTitle: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginTop: '1em',
      color: darkMode ? '#f5f5f5' : '#333',
    },
    list: {
      marginLeft: '1em',
      color: darkMode ? '#f5f5f5' : '#333',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title} className="title is-1">About</h1>

      <p style={styles.content}>
        This is the course website for Columbia E4579 For Fall 2023. Welcome to IEOR 4579: Modern Recommendation Systems. Feel free to ask questions or comment to start a discussion. You will learn more the more effort you put in.
      </p>

      <p style={styles.content}>
        In this course, you will learn to build an end-to-end recommendation system based on the engagement of students from this course and the previous semester. The app that is built for you (you'll get instructions shortly) is a photo-recommendation app with a like/dislike feature, reminiscent of Instagram. All photos are AI-generated by the generative AI model, Stable Diffusion. You will be required to recommend a feed of photos from over 250,000 choices.
      </p>

      <div>
        <span style={styles.subTitle}>Candidate Generation</span>
        <ul style={styles.list}>
          <li>collaborative filtering</li>
          <li>trending</li>
          <li>cold start</li>
          <li>N-tower neural network models</li>
          <li>cross-attention teachers</li>
          <li>distillation</li>
          <li>transfer learning</li>
          <li>random graph walking</li>
          <li>reverse indexes</li>
        </ul>

        <span style={styles.subTitle}>Filtering</span>
        <ul style={styles.list}>
          <li>small online models</li>
          <li>caching</li>
          <li>deduplication</li>
          <li>policy</li>
        </ul>

        <span style={styles.subTitle}>Prediction/Bidding</span>
        <ul style={styles.list}>
          <li>User logged activity based prediction (time-series)</li>
          <li>Multi-gate mixture of experts (MMOE)</li>
          <li>Regularization</li>
          <li>Offline/Online evaluation like NDCG, p@k, r@k</li>
          <li>Boosted Trees</li>
          <li>Value Based Bidding</li>
        </ul>

        <span style={styles.subTitle}>Ranking</span>
        <ul style={styles.list}>
          <li>Re-ranking</li>
          <li>Ordering</li>
          <li>Diversity</li>
          <li>Enrich/Metadata/Personalization</li>
          <li>Value Functions</li>
        </ul>

        <span style={styles.subTitle}>Misc</span>
        <ul style={styles.list}>
          <li>Data Privacy and AI Ethics</li>
          <li>Creator Based Models</li>
          <li>Declared, Explicit and implicit topics</li>
          <li>Explore/Exploit</li>
          <li>Large Language Models & Transformers</li>
          <li>Interpret/Understand/Context/Intention</li>
        </ul>
      </div>

      <p style={styles.content}>
        These topics can be applied to any modern recommendation system, from e-commerce to travel plans to social media. I have worked at Uber Eats, Facebook, Instagram, and Google on their recommendation platforms, so I will focus on those use cases as I know them best.
      </p>

      <p style={styles.content}>
        <span style={styles.subTitle}>Assignments</span><br />
        There are 3 project assignments, 1 presentation on your work, and 4 assignments to use this app (logged in with your UNI on the feed page). Each assignment will be a group project to implement a Candidate Generator, Filter/Small Predictor, and a prediction/ranker. Part of your grade will be based on how engaging it is to other students during the assignments to use the app.
      </p>

    </div>
  )
};

export default About;
