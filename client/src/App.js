import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Auth, Home } from 'pages';

const App = ({ isAuth }) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/im" exact>
          <Home />
        </Route>
        <Redirect path="/im" />
      </Switch>
    )
  };

  return (
    <Switch>
      <Route path={['/', '/login', '/register', '/register/check']} exact>
        < Auth />
      </Route>
      <Redirect path="/login" />
    </Switch>
  );
}

{/* <Route path={['/', '/login', '/register', '/register/check']} exact>
< Auth />
</Route>
<Route path="/im" exact>
<Home />
</Route>
{ isAuth ? <Redirect to="/im" /> : <Redirect to="/login" /> } */}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
