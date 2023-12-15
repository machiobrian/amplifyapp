import React from "react";
import logo from './logo.svg'
import './App.css'

// aws addition
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({signOut}){
  return (
    <View className="App">
      <Card>
        <Image src={logo} className="App-logo" alt="logo"/>
        <Heading level={1}> We now have Authentication Service</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);

// withAuthenticator component - this scaffolds out an entire user authentication
// flow athat allows users to sign up/in reset passwords - also confirming
// MFA