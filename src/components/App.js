import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Heading from "./Heading";
import Registration from "./Registration";
import LandingPageSuccess from "./LandingPageSuccess";
import EmailSuccess from "./EmailSuccess";
import RunLottery from "./RunLottery";
import Enroll from "./Enroll";
import RegistrationClosed from "./RegistrationClosed";
import PaymentSuccess from "./PaymentSuccess";
import Decline from "./Decline";
import DeclineSuccess from "./DeclineSuccess";
import Signup from "./Signup";
import Signin from "./Signin";
import LotteryForm from "./LotteryForm";
import EmailGroup from "./emailGroup";
import SeminarRegistration from "./SeminarRegistration";

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
            <Route path="/" exact component={RegistrationClosed} />
            <Route
              path="/LandingPageSuccess"
              exact
              component={LandingPageSuccess}
            />
            <Route path="/EmailSuccess" exact component={EmailSuccess} />
            <Route path="/Enroll" exact component={Enroll} />
            <Route path="/RunLottery" exact component={RunLottery} />
            <Route path="/PaymentSuccess" exact component={PaymentSuccess} />
            <Route path="/Decline" exact component={Decline} />
            <Route path="/DeclineSuccess" exact component={DeclineSuccess} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Signin" component={Signin} />
            <Route path="/LotteryForm" component={LotteryForm} />
            <Route path="/Registration" component={Registration} />
            <Route path="/EmailGroup" component={EmailGroup} />
            <Route
              path="/SeminarRegistration"
              component={SeminarRegistration}
            />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
