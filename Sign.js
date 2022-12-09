import React, { useState, useMemo } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Sign = props => {
  const { navigation } = props;

  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [username, setUsername] = useState('')


  const checkPass = useMemo(() => {
    return pass.length <= 1 && pass.length > 0
  }, [pass]);

  const checkPassConfirm = useMemo(() => {
    return pass === passConfirm && passConfirm.length > 0
  }, [passConfirm, pass]);

  const formValid = useMemo(() => {
    return pass.length > 3 && pass === passConfirm && username.length > 2
  }, [pass, username])


  return (
    <SafeAreaView style={styles.screen}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'black' }}>Inscription</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={{ width: 100, height: 100, borderRadius: 50, margin: 15 }} />
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder={'username'}
        style={styles.input}>
      </TextInput>
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder={'Password'}
        style={checkPass ? styles.inputError : styles.input}
        secureTextEntry={true}>
      </TextInput>
      <TextInput
        value={passConfirm}
        onChangeText={setPassConfirm}
        placeholder={'Confirm Password'}
        style={checkPassConfirm ? styles.input : styles.inputError}
        secureTextEntry={true}>
      </TextInput>
      <TouchableOpacity style={formValid ? styles.button : styles.buttonError} onPressOut={formValid ? () => alert("Bonjour " + username + ". mot de passe : " + pass) : () => alert("Probleme Formulaire")}><Text>Envoyer</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',

  },
  input: {
    backgroundColor: 'lightgrey',
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    margin: 15
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 15
  },
  buttonError: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderColor: 'red',
  },
  inputError: {
    backgroundColor: 'lightgrey',
    borderColor: 'red',
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    margin: 15
  },
});

export default Sign;