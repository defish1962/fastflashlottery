import React, { Component } from 'react';
import logo from '../logo.png';
import { Header, Image } from 'semantic-ui-react';

class Heading extends Component {
  render() {
    return (
      <div>
        <p />
        <Header as='h2' textAlign='center'>
          Fast Flash Workshops
        </Header>
        <Image src={logo} centered size='medium' />
      </div>
    );
  }
}

export default Heading;
