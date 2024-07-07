import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  login,
  getCoordinadorPerfil,
  getRoleBasedOnToken,
  getVoluntarioPerfil,
} from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoggedIn(true);

      const role = await getRoleBasedOnToken();

      if (role === "ROLE_COORDINATOR") {
        await getCoordinadorPerfil();
      }

      if (role === "ROLE_VOLUNTEER") {
        await getVoluntarioPerfil();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogged = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    handleLogged();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
