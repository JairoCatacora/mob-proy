import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { updateLugar } from "../api";

const LugarUpdate = ({ item, setUpdateList, setModalUpdate, updateList }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ubication, setUbication] = useState("");

  const actualizar = async () => {
    try {
      await updateLugar(id, name, ubication);
      setUpdateList(!updateList);
      setModalUpdate(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  useEffect(() => {
    setId(item.id);
    setName(item.name);
    setUbication(item.ubication);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Ubicación:</Text>
      <TextInput
        style={styles.input}
        value={ubication}
        onChangeText={setUbication}
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

export default LugarUpdate;
