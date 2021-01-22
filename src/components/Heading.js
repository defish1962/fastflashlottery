import React from "react";
//import logo from "../logo.png";
import typewriterLogo from '../typewriter-logo.png';
import { Header, Image } from "semantic-ui-react";
//import AuthStateApp from "./AuthState";

const Heading = () => {
  return (
    <div>
      <p />
      <Header as="h2" textAlign="center">
        Fast Flash Workshops
        
      </Header>
      <Image src={typewriterLogo} centered size="medium" />
    </div>
  );
};

export default Heading;
