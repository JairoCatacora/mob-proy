import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { saveEmergenciaNatural } from "../api";

const EmergenciaNaturalCreate = ({ setUpdateList, setCreate, updateList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");

  const createEmergenciaNatural = async () => {
    try {
      await saveEmergenciaNatural(name, description, importance);
      setUpdateList(!updateList);
      setCreate(false);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const cancel = () => {
    setUpdateList(!updateList);
    setCreate(false);
  };

  return (
    <>
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
      <Button title="Crear" onPress={createEmergenciaNatural} />
      <Button title="Cancelar" onPress={cancel} />
    </>
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
