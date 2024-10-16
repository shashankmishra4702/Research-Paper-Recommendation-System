# Research Paper Recommendation System

This project provides personalized research paper recommendations using a combination of content-based and collaborative filtering. It integrates a machine learning model with a full-stack web application, making it easy for users to discover relevant academic papers.

## Table of Contents

1. Introduction
2. Features of Project
3. Technology Used
4. Usage
5. Future Work


## Introduction
The Research Paper Recommendation System is designed to assist users in finding relevant academic papers based on their research interests. It leverages machine learning techniques, including content-based filtering (with a doc2vec NLP model) and collaborative filtering (using a citation matrix), to provide personalized recommendations. By integrating with the Semantic Scholar API, users can easily access the recommended papers directly through the website.

The recommendation system predicts the top 5 to 10 research papers for each user, and the website allows users to manage their profiles and update preferences for more accurate suggestions.

## Features of Project

1. Content-Based Filtering: Uses a doc2vec NLP model to analyze the text content of research papers and recommend similar papers.
2. Collaborative Filtering: Utilizes a citation matrix to recommend papers based on citation relationships between research works.
3. Profile Management: Users can create and update their profiles, which helps refine recommendation results based on user preferences.
4. Semantic Scholar API Integration: Provides direct links to research papers from the Semantic Scholar database, allowing users to access papers instantly.
5. Top Recommendations: The system delivers a personalized list of 5 to 10 research paper recommendations.
6. Flask-Integrated Web Application: A user-friendly front-end for interacting with the recommendation system.

## Technologies Used

1. HTML/CSS/JS
2. ReactJS / NodeJS
3. MongoDB
4. Python
5. Flask
6. Deep Learning

## Usage 
1. Sign up or log in to the platform.
2. Edit your profile to add or update your research interests.
3. Get personalized research paper recommendations.
4. Click on the recommended papers to view them on Semantic Scholar.

## Future Work
We are currently working on incorporating user-based collaborative filtering to improve the recommendation accuracy. This feature will take into account user behaviors and interactions for more tailored suggestions.

