import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { saveEmergenciaNatural } from "../api";

const EmergenciaNaturalCreate = ({
  setUpdateList,
  setModalCreate,
  updateList,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");

  const crear = async () => {
    try {
      await saveEmergenciaNatural(name, description, importance);
      setUpdateList(!updateList);
      setModalCreate(false);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Importancia:</Text>
      <TextInput
        style={styles.input}
        value={importance}
        onChangeText={setImportance}
      />
      <Button title="Crear" onPress={crear} />
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
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default EmergenciaNaturalCreate;
