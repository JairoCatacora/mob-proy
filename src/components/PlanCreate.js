import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createPlan } from "../api";

const PlanCreate = ({ setUpdateList, setCreate, updateList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");

  const crear = async () => {
    try {
      await createPlan(name, description, state);
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
      <Text>Estado:</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />
      <Button title="Crear" onPress={crear} />
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

export default PlanCreate;