import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomeScreen } from '../screens/home/home.screen';

export const AppRouter: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route>
          <h2>Page not found</h2>
        </Route>
      </Switch>
    </Router>
  );
};
