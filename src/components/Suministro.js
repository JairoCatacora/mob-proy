import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { deletePlan } from "../api";
import SuministroCreate from "./SuministroCreate";
import SuministroUpdate from "./SuministroUpdate";

const Suministro = ({ suministros }) => {
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [plan, setPlan] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const crear = async () => {
    setCreateForm(true);
  };

  const actualizar = async (item) => {
    setPlan(item);
    setUpdateForm(true);
  };

  const eliminar = async (id) => {
    try {
      await deletePlan(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

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
      {createForm && !updateForm ? (
        <SuministroCreate
          setUpdateList={setUpdateList}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      ) : (
        !updateForm && <Button title="Crear" onPress={crear} />
      )}
      {updateForm && (
        <SuministroUpdate
          item={plan}
          setUpdateList={setUpdateList}
          setUpdate={setUpdateForm}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      )}

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
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});

export default Suministro;
