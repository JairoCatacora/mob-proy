import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { deleteEmergenciaNatural, listEmergenciaNatural } from "./api";
import EmergenciaNaturalCreate from "./components/EmergenciaNaturalCreate";
import EmergenciaNaturalUpdate from "./components/EmergenciaNaturalUpdate";

const EmergenciaNaturalScreen = ({}) => {
  const [emergencias, setEmergencias] = useState([]);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [emergencia, setEmergencia] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const createEmergenciaNatural = async () => {
    setCreate(true);
  };

  const actualizarEmergenciaNatural = async (item) => {
    setEmergencia(item);
    setUpdate(true);
  };

  const listarEmergenciaNatural = async () => {
    try {
      const emergenciaNaturalList = await listEmergenciaNatural();
      setEmergencias(emergenciaNaturalList.content);
    } catch (error) {
      console.error("List failed", error);
    }
  };

  const eliminarEmergenciaNatural = async (id) => {
    try {
      await deleteEmergenciaNatural(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

  useEffect(() => {
    listarEmergenciaNatural();
  }, [updateList]);

  const Item = ({ id, name, description, importance }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{importance}</Text>

      <Button
        title="Actualizar"
        color="#f194ff"
        onPress={() =>
          actualizarEmergenciaNatural({ id, name, description, importance })
        }
      />
      <Button
        title="Eliminar"
        color="#FF0000"
        onPress={() => eliminarEmergenciaNatural(id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {create && !update ? (
        <EmergenciaNaturalCreate
          setUpdateList={setUpdateList}
          setCreate={setCreate}
          updateList={updateList}
        />
      ) : (
        !update && <Button title="Crear" onPress={createEmergenciaNatural} />
      )}
      {update && (
        <EmergenciaNaturalUpdate
          item={emergencia}
          setUpdateList={setUpdateList}
          setUpdate={setUpdate}
          setCreate={setCreate}
          updateList={updateList}
        />
      )}

      <FlatList
        data={emergencias}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            description={item.description}
            importance={item.importance}
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

export default EmergenciaNaturalScreen;
