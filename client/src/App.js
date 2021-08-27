import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { Auth, Home } from 'pages';

const App = ({ isAuth }) => {
  return (
    <div className="wrapper">
      <Route path={['/', '/login', '/register']} exact>
        < Auth />
      </Route>
      <Route path="/im" exact>
        <Home />
      </Route>
      {isAuth ? <Redirect to="/im" /> : <Redirect to="/login" />}
    </div>
  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
