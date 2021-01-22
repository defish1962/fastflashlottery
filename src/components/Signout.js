import { Auth } from 'aws-amplify';
import { Header } from 'semantic-ui-react';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const Signout = () => {
    return (
        <Header as='h2' textAlign='center'>
          You have been signed out
        </Header>
    )
}