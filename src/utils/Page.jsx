// Sourced from: https://stackoverflow.com/a/55415722

import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Page = ({ title, ...rest }) => {
  useEffect(() => {
    document.title = "Yonder | " + title;
  });
  return <Route {...rest} />;
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
