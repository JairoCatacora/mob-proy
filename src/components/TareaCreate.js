import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { saveTask, planesDisponibles, listLugares } from "../api";
import DropdownComponent from "./Dropdown";

const TareaCreate = ({ setUpdateList, setModalCreate, updateList, set }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [planes, setPlanes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [planId, setPlanId] = useState([]);
  const [lugarId, setLugarId] = useState([]);

  const [name, setName] = useState([]);
  const [stock, setStock] = useState([]);

  const [suministros, setSuministros] = useState([]);

  const crear = async () => {
    const suministrosList = suministros.map((item) => ({
      name: item.name,
      stock: item.stock,
    }));

    try {
      await saveTask(
        title,
        description,
        status,
        planId,
        lugarId,
        suministrosList
      );
      setUpdateList(!updateList);
      setModalCreate(false);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const crearSuministro = async () => {
    try {
      const suministrosList = [
        ...suministros,
        {
          key: suministros.length + 1,
          name,
          stock,
        },
      ];
      setSuministros(suministrosList);
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

  const ItemSuministro = ({ name, stock }) => (
    <View>
      <Text>Nombre: {name}</Text>
      <Text>Stock: {stock}</Text>
    </View>
  );

  useEffect(() => {
    getPlanes();
    getLugares();
  }, []);

  return (
    <ScrollView>
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

      <View>
        <Text>Suministros:</Text>
        <FlatList
          data={suministros}
          renderItem={({ item }) => (
            <ItemSuministro name={item.name} stock={item.stock} />
          )}
          keyExtractor={(item) => item.key}
        />

        <Text>Titulo:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text>Stock:</Text>
        <TextInput style={styles.input} value={stock} onChangeText={setStock} />
        <Button title="Crear Suministro" onPress={crearSuministro} />
      </View>

      <Button title="Crear Tarea" onPress={crear} />
    </ScrollView>
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

export default TareaCreate;
