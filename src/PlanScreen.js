import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { deletePlan, listPlans } from "./api";
import PlanCreate from "./components/PlanCreate";
import PlanUpdate from "./components/PlanUpdate";

const PlanScreen = ({ navigation }) => {
  const [planes, setPlanes] = useState([]);
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

  const all = async () => {
    try {
      const list = await listPlans();
      setPlanes(list);
    } catch (error) {
      console.error("List failed", error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deletePlan(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const Item = ({ id, name, description, state }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{state}</Text>

      <Button
        title="Actualizar"
        color="#f194ff"
        onPress={() => actualizar({ id, name, description, state })}
      />
      <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {createForm && !updateForm ? (
        <PlanCreate
          setUpdateList={setUpdateList}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      ) : (
        !updateForm && <Button title="Crear" onPress={crear} />
      )}
      {updateForm && (
        <PlanUpdate
          item={plan}
          setUpdateList={setUpdateList}
          setUpdate={setUpdateForm}
          setCreate={setCreateForm}
          updateList={updateList}
        />
      )}

      <FlatList
        data={planes}
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
});

export default PlanScreen;
