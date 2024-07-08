import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { actualizarSuministro, tareasDisponibles } from "../api";
import DropdownComponent from "./Dropdown";

const SuministroUpdate = ({
  item,
  setUpdateList,
  setModalUpdate,
  updateList,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [tareas, setTareas] = useState([]);
  const [tareaId, setTareaId] = useState("");

  const allTareas = async () => {
    try {
      const data = await tareasDisponibles();
      const dropdownData = data.map((item) => ({
        label: item.title,
        value: item.id,
      }));
      setTareas(dropdownData);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const actualizar = async () => {
    try {
      await actualizarSuministro(id, name, stock);
      setUpdateList(!updateList);
      setModalUpdate(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  useEffect(() => {
    setId(item.id);
    setName(item.name);
    setStock(item.stock);

    allTareas();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Stock:</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} />
      <Text>Tareas:</Text>
      <DropdownComponent
        data={tareas}
        label="Tareas disponibles"
        value={tareaId}
        setValue={setTareaId}
      />

      <Button title="Actualizar" onPress={actualizar} />
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

export default SuministroUpdate;
