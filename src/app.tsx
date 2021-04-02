import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="font-serif">test</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
