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
import { deletePlan, getPerfil, listPlans, participatePlan } from "../../api";
import PlanCreate from "../../components/PlanCreate";
import PlanUpdate from "../../components/PlanUpdate";

const PlanScreen = ({}) => {
  const [planes, setPlanes] = useState([]);
  const [plan, setPlan] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [miPlanes, setMiPlanes] = useState("");

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const crear = async () => {
    setModalCreate(true);
  };

  const actualizar = async (item) => {
    setPlan(item);
    setModalUpdate(true);
  };

  const participar = async (id) => {
    const { id: idCordinador } = await getPerfil();

    try {
      await participatePlan(id, idCordinador);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Participar failed", error);
    }
  };

  const all = async () => {
    try {
      const list = await listPlans();
      const { id } = await getPerfil();

      const misPlanes = [];
      const planesDisponibles = [];

      list.forEach((item) => {
        if (item.coordinadores.find((coordinador) => coordinador.id === id)) {
          misPlanes.push(item);
        } else {
          if (
            item.state !== "REJECTED" ||
            item.state !== "CANCELLED" ||
            item.state !== "COMPLETED"
          ) {
            planesDisponibles.push(item);
          }
        }
      });

      setMiPlanes(misPlanes);
      setPlanes(planesDisponibles);
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

  const ItemMiPlanes = ({ id, name, description, state }) => (
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
        <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Crear" onPress={crear} />

      <Text>Mis planes:</Text>
      <FlatList
        data={miPlanes}
        renderItem={({ item }) => (
          <ItemMiPlanes
            id={item.id}
            name={item.name}
            description={item.description}
            state={item.state}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Text>Planes:</Text>
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
            <PlanCreate
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
            <PlanUpdate
              item={plan}
              setUpdateList={setUpdateList}
              setModalUpdate={setModalUpdate}
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
  actions: {
    flexDirection: "row",
    gap: 8,
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

export default PlanScreen;
