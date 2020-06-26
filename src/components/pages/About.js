import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1>About This App</h1>
      <p>App to search Github users.</p>
      <p>Version: 1.0.0</p>
      <p>
        Developer's Portfolio & Contacts:{' '}
        <a href='https://m-faried.github.io/m-faried-portfolio/' target='blank'>
          https://m-faried.github.io/m-faried-portfolio/
        </a>
      </p>
    </Fragment>
  );
};

export default About;
