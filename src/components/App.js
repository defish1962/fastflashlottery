import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Heading from './Heading';
import Registration from './Registration';
import LandingPageSuccess from './LandingPageSuccess';
import history from '../history';
import RunLottery from './RunLottery';
import Enroll from './Enroll';
import RegistrationClosed from './RegistrationClosed';
import PaymentSuccess from './PaymentSuccess';
import Decline from './Decline';
import DeclineSuccess from './DeclineSuccess';

const App = () => {
  return (
    <div>
      <div className='ui header'>
        <Router history={history}>
          <div>
            <Heading />
            <Switch>
              <Route path='/' exact component={RegistrationClosed} />
              <Route path='/Registration' exact component={Registration} />
              <Route
                path='/LandingPageSuccess'
                exact
                component={LandingPageSuccess}
              />
              <Route path='/Enroll' exact component={Enroll} />
              <Route path='/RunLottery' exact component={RunLottery} />
              <Route path='/PaymentSuccess' exact component={PaymentSuccess} />
              <Route path='/Decline' exact component={Decline} />
              <Route path='/DeclineSuccess' exact component={DeclineSuccess} />
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
// <RunLottery />
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
