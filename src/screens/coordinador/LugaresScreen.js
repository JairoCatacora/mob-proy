import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import { deleteLugar, listLugares } from "../../api";
import LugarCreate from "../../components/LugarCreate";
import LugarUpdate from "../../components/LugarUpdate";

const LugaresScreen = ({ navigation }) => {
  const [lugares, setLugares] = useState([]);
  const [emergencia, setEmergencia] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const crear = async () => {
    setModalCreate(true);
  };

  const actualizar = async (item) => {
    setEmergencia(item);
    setModalUpdate(true);
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
      <Button title="Crear" onPress={crear} />

      <FlatList
        data={lugares}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.name} ubication={item.ubication} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreate}
        onRequestClose={() => {
          setModalCreate(!modalCreate);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LugarCreate
              setUpdateList={setUpdateList}
              setModalCreate={setModalCreate}
              updateList={updateList}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalCreate(!modalCreate)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUpdate}
        onRequestClose={() => {
          setModalUpdate(!setModalUpdate);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LugarUpdate
              item={emergencia}
              setUpdateList={setUpdateList}
              setUpdate={setUpdateForm}
              setCreate={setCreateForm}
              updateList={updateList}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalUpdate(!modalUpdate)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    width: "100%",
    height: "100%",
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    height: "100%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LugaresScreen;
