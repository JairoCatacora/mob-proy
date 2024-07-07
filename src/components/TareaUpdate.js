import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import {
  updateLugar,
  planesDisponibles,
  listLugares,
  getRoleBasedOnToken,
} from "../api";
import DropdownComponent from "./Dropdown";

const TareaUpdate = ({
  item,
  setUpdateList,
  setUpdate,
  updateList,
  setCreate,
}) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [planes, setPlanes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [planId, setPlanId] = useState([]);
  const [lugarId, setLugarId] = useState([]);
  const [suministros, setSuministros] = useState("");
  const [coordinadores, setCoordinadores] = useState("");

  const actualizar = async () => {
    try {
      await updateLugar(id, name, ubication);
      setUpdateList(!updateList);
      setUpdate(false);
      setCreate(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const cancel = () => {
    setUpdateList(!updateList);
    setUpdate(false);
    setCreate(false);
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
    setSuministros(item.suministros);
    setCoordinadores(item.coordinadores);

    getRole();
    getPlanes();
    getLugares();
  }, []);

  const Item = ({ id, name, description, state }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{state}</Text>

      <View style={styles.actions}>
        <Button
          title="Actualizar"
          color="#f194ff"
          onPress={() => actualizar({ id, name, description, state })}
        />
        <Button
          title="Participar"
          color="#FF0000"
          onPress={() => participar(id)}
        />
        <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
      </View>
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

      <Text>Suministros:</Text>
      <FlatList
        data={suministros}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            description={item.description}
            state={item.state}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Text>Coordinadores:</Text>
      <FlatList
        data={coordinadores}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            description={item.description}
            state={item.state}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Button title="Actualizar" onPress={actualizar} />
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

export default TareaUpdate;
