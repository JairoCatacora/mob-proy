import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { deleteLugar, listLugares } from "./api";
import LugarCreate from "./components/LugarCreate";
import LugarUpdate from "./components/LugarUpdate";

const LugaresScreen = ({ navigation }) => {
  const [lugares, setLugares] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [emergencia, setEmergencia] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const crear = async () => {
    setCreateForm(true);
  };

  const actualizar = async (item) => {
    setEmergencia(item);
    setUpdateForm(true);
  };

  const all = async () => {
    try {
      const list = await listLugares();
      setLugares(list.content);
    } catch (error) {
      console.error("List failed", error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteLugar(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

  const verTareas = async (item) => {
    try {
      navigation.navigate("Tareas", { tareas: item.tareas });
    } catch (error) {
      console.error("List failed", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const Item = ({ id, name, ubication }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{ubication}</Text>

      <Button
        title="Ver tareas"
        color="#f194ff"
        onPress={() => verTareas({ id })}
      />
      <Button
        title="Actualizar"
        color="#f194ff"
        onPress={() => actualizar({ id, name, ubication })}
      />
      <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {createForm && !updateForm ? (
        <LugarCreate
          setUpdateList={setUpdateList}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      ) : (
        !updateForm && <Button title="Crear" onPress={crear} />
      )}
      {updateForm && (
        <LugarUpdate
          item={emergencia}
          setUpdateList={setUpdateList}
          setUpdate={setUpdateForm}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      )}

      <FlatList
        data={lugares}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.name} ubication={item.ubication} />
        )}
        keyExtractor={(item) => item.id}
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
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default LugaresScreen;
