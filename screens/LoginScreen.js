import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Admin' && password === 'Admin') {
      navigation.navigate('Sensor');
    } else {
      Alert.alert('Acesso negado', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HORTA</Text>
      
      <Image 
  source={require('../img/UniFBV_Wyden-logo.webp')}
  style={styles.image}
/>

    <Text style={styles.login}>LOGIN</Text>
    <View style={styles.underline} />

      
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#008000'
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 0,
    color:'#FFFFFF'
  },
  login:{
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000000'
  },
  underline: {
    width: '70%',       // Largura maior que o título
    height: 2,           // Altura da linha
    backgroundColor: '#fff', // Cor da linha
    marginTop: 5,        // Espaçamento entre o título e a linha
    marginBottom: 30,
  },
  image: {
    width: 380,
    height: 200,
    resizeMode: 'stretch',
    marginBottom: 0,
    marginTop: -30
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
