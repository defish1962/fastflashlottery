import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Heading from "./Heading";
import Registration from "./Registration";
import LandingPageSuccess from "./LandingPageSuccess";
import RunLottery from "./RunLottery";
import Enroll from "./Enroll";
import RegistrationClosed from "./RegistrationClosed";
import PaymentSuccess from "./PaymentSuccess";
import Decline from "./Decline";
import DeclineSuccess from "./DeclineSuccess";
import Signup from "./Signup";
import Signin from "./Signin";

const App = () => {
  return (
    <div>
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Heading />
            <Route
              path="/RegistrationClosed"
              exact
              component={RegistrationClosed}
            />
            <Route path="/" exact component={Registration} />
            <Route
              path="/LandingPageSuccess"
              exact
              component={LandingPageSuccess}
            />
            <Route path="/Enroll" exact component={Enroll} />
            <Route path="/RunLottery" exact component={RunLottery} />
            <Route path="/PaymentSuccess" exact component={PaymentSuccess} />
            <Route path="/Decline" exact component={Decline} />
            <Route path="/DeclineSuccess" exact component={DeclineSuccess} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Signin" component={Signin} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
