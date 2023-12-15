import React, {useState, useEffect} from "react";
import logo from './logo.svg'
import './App.css'
import {API} from 'aws-amplify';

// aws addition
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import {listNotes} from './graphql/queries';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
}

export default withAuthenticator(App);

// withAuthenticator component - this scaffolds out an entire user authentication
// flow athat allows users to sign up/in reset passwords - also confirming
// MFA