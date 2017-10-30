import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import Example from './containers/Example';
import Button from './components/Button';

const App = () => (
  <div>
    <h1>....</h1>
    <Button />
    <Example />
  </div>
);

export default function Root({
  store,
}) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
