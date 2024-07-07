import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { register } from "../api";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(false);

  const toggleCheckbox = () => {
    setIsCoordinator(!isCoordinator);
  };

  const handleRegister = async () => {
    try {
      await register(name, email, password, phone, isCoordinator);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
      />
      <Text>Correo:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Text>Telefono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your password"
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          {isCoordinator && <View style={styles.checked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Eres un coordinador?</Text>
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "blue",
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default RegisterScreen;
