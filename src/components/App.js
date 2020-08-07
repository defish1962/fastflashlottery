import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Heading from './Heading';
import Registration from './Registration';
import LandingPageSuccess from './LandingPageSuccess';
import history from '../history';

const App = () => {
  return (
    <div>
      <div className='ui header'>
        <Router history={history}>
          <div>
            <Heading />
            <Switch>
              <Route path='/' exact component={Registration} />
              <Route
                path='/LandingPageSuccess'
                exact
                component={LandingPageSuccess}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;

// import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
// import Heading from './Heading';
// import Registration from './Registration';
// import LandingPageSuccess from './LandingPageSuccess';

// const App = () => {
//   return (
//     <div className='ui container'>
//       <Router>
//         <Heading />
//         <Route path='/Registration' exact component={Registration} />
//         <Route
//           path='/LandingPageSuccess'
//           exact
//           component={LandingPageSuccess}
//         />
//         <Registration />
//       </Router>
//     </div>
//   );
// };

// export default App;
