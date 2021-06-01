import { Route } from 'react-router-dom';

import { Auth, Home } from 'pages';

function App() {
  return (
    <div className="wrapper">
      <Route path={['/', '/login', '/register']} exact>
        < Auth />
      </Route>
      <Route path="/im" exact>
        <Home />
      </Route>
    </div>
  );
}

export default App;
