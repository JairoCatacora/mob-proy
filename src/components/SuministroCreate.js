import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { saveTask, planesDisponibles } from "../api";
import DropdownComponent from "./Dropdown";

const SuministroCreate = ({ setUpdateList, setCreate, updateList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [planes, setPlanes] = useState([]);

  const crearSuministro = async () => {
    try {
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const crear = async () => {
    try {
      await saveTask(title, description, status);
      setUpdateList(!updateList);
      setCreate(false);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const getPlanes = async () => {
    try {
      const data = await planesDisponibles();
      const dropdownData = data.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      setPlanes(dropdownData);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const cancel = () => {
    setUpdateList(!updateList);
    setCreate(false);
  };

  useEffect(() => {
    getPlanes();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Titulo:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Estado:</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} />
      <DropdownComponent data={planes} label="Planes disponibles" />

      <Button title="Crear Suministro" onPress={crearSuministro} />
      <Button title="Crear" onPress={crear} />
      <Button title="Cancelar" onPress={cancel} />
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

export default SuministroCreate;
