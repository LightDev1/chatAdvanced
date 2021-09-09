import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Auth, Home } from 'pages';

const App = ({ isAuth }) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dialogs/:id">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <Switch>
      <Route path={['/', '/login', '/register', '/register/verify']} exact>
        < Auth />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
