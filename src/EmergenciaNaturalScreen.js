import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { saveEmergenciaNatural } from "./api";

const EmergenciaNaturalScreen = ({ navigation, setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");

  const createEmergenciaNatural = async () => {
    try {
      await saveEmergenciaNatural(name, description, importance);
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
        placeholder="Enter your email"
      />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter your password"
      />
      <Text>Importancia:</Text>
      <TextInput
        style={styles.input}
        value={importance}
        onChangeText={setImportance}
        placeholder="Enter your password"
      />
      <Button
        title="Crear emergencia natural"
        onPress={createEmergenciaNatural}
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

export default EmergenciaNaturalScreen;
