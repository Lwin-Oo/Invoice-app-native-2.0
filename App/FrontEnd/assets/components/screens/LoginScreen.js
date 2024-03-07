// LoginScreen.js

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AuthService from '../../constants/AuthService'

const LoginScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const handleLogin = async () => {
        try{
            const user = await AuthService.login(email, password);
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <View style={stytles.container}>
            <TextInput
                style = {stytles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style = {stytles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin}/>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    error: {
      color: 'red',
      marginTop: 10,
    },
  });
  
  export default LoginScreen;