import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="about-page">
    <div>
      <h3>About Phitness Nation:</h3>
      <p>
        Phil is a qualified Personal Trainer who earned his Bachelors degree in Exercise Science from Augsburg University.  Before starting Phitness Nation,
        Phil worked with nationally recognized businesses over the course of 6 years helping others improve their flexibility, strength and physical attributes. 
          </p>
        <h3>Email:</h3> Phitnessnation@gmail.com
    <h3>Phone:</h3>(507) 226.5356
    </div>
  </div>
);

export default AboutPage;
