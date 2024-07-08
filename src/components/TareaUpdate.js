import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { planesDisponibles, listLugares, updateTarea } from "../api";
import DropdownComponent from "./Dropdown";

const TareaUpdate = ({ item, setUpdateList, setModalUpdate, updateList }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [planes, setPlanes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [planId, setPlanId] = useState([]);
  const [lugarId, setLugarId] = useState([]);

  const actualizar = async () => {
    try {
      await updateTarea(id, title, description, status, planId, lugarId);
      setUpdateList(!updateList);
      setModalUpdate(false);
    } catch (error) {
      console.error("Update failed", error);
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

  const getLugares = async () => {
    try {
      const data = await listLugares();
      const dropdownData = data.content.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      setLugares(dropdownData);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
    setPlanId(item.planId);
    setLugarId(item.lugarId);

    getPlanes();
    getLugares();
  }, []);

  const Item = ({ id, name, description, state }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{state}</Text>
    </View>
  );

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
      <DropdownComponent
        data={planes}
        label="Planes disponibles"
        value={planId}
        setValue={setPlanId}
      />
      <DropdownComponent
        data={lugares}
        label="Lugares disponibles"
        value={lugarId}
        setValue={setLugarId}
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

export default TareaUpdate;
