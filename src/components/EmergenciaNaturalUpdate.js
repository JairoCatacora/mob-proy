import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { updateEmergenciaNatural } from "../api";

const EmergenciaNaturalUpdate = ({
  item,
  setUpdateList,
  setUpdate,
  updateList,
  setCreate,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");

  const actualizarEmergenciaNatural = async () => {
    try {
      await updateEmergenciaNatural(id, name, description, importance);
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

  useEffect(() => {
    setId(item.id);
    setName(item.name);
    setDescription(item.description);
    setImportance(item.importance);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Importancia:</Text>
      <TextInput
        style={styles.input}
        value={importance}
        onChangeText={setImportance}
      />
      <Button title="Actualizar" onPress={actualizarEmergenciaNatural} />
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

export default EmergenciaNaturalUpdate;
