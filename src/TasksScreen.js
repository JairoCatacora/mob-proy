import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import {
  getRoleBasedOnToken,
  tareasDisponibles,
  logout,
  updateTarea,
  participarTarea,
  getPerfil,
} from "./api";
import TareaCreate from "./components/TareaCreate";
import TareaUpdate from "./components/TareaUpdate";
import TareaVoluntarioScreen from "./voluntario/TareaScreen";

const TasksScreen = ({ setIsLoggedIn, route }) => {
  const [tasks, setTasks] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [role, setRole] = useState("");
  const [miTareas, setMiTareas] = useState([]);

  const tareas = route.params?.tareas;

  const crear = async () => {
    setCreateForm(true);
  };

  const participar = async (idTarea) => {
    try {
      const { id: idVoluntario } = await getPerfil();

      await participarTarea(idTarea, idVoluntario);
      setUpdateList(!updateList);
      setUpdate(false);
      setCreate(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const completar = async (item) => {
    try {
      await updateTarea(item.id, item.title, item.description, "COMPLETED");
      setUpdateList(!updateList);
      setUpdate(false);
      setCreate(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const actualizar = async (item) => {
    setTarea(item);
    setUpdateForm(true);
  };

  const allVoluntario = async () => {
    try {
      const { id } = await getPerfil();
      const data = await tareasDisponibles();

      const misTareas = [];
      const tareas = [];

      data.forEach((item) => {
        if (item.voluntarios.find((voluntario) => voluntario.id === id)) {
          misTareas.push(item);
        } else {
          tareas.push(item);
        }
      });

      setTasks(tareas);
      setMiTareas(misTareas);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const allCoordinador = async () => {
    try {
      const data = await tareasDisponibles();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const all = async () => {
    const role = await getRoleBasedOnToken();

    if (role === "ROLE_COORDINATOR") {
      allCoordinador();
    }

    if (role === "ROLE_VOLUNTEER") {
      allVoluntario();
    }
  };

  const getRole = async () => {
    try {
      const data = await getRoleBasedOnToken();
      setRole(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    getRole();
    all();
  }, [updateList]);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  const Item = ({ id, title, description, status }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{status}</Text>

      <View style={styles.actions}>
        {role === "ROLE_COORDINATOR" && (
          <View>
            <Button
              title="Actualizar"
              color="#f194ff"
              onPress={() => actualizar({ id, title, description, status })}
            />
            <Button
              title="Eliminar"
              color="#FF0000"
              onPress={() => eliminar(id)}
            />
          </View>
        )}
        {role === "ROLE_VOLUNTEER" && (
          <View>
            <Button
              title="Participar"
              color="#f194ff"
              onPress={() => participar(id)}
            />
          </View>
        )}
      </View>
    </View>
  );

  const ItemMiTareas = ({ id, title, description, status }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{status}</Text>

      <View style={styles.actions}>
        <Button
          title="Completar"
          color="#f194ff"
          onPress={() => completar({ id, title, description, status })}
        />
        <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {role === "ROLE_COORDINATOR" && (
        <View>
          {createForm && !updateForm ? (
            <TareaCreate
              setUpdateList={setUpdateList}
              setCreate={setCreateForm}
              updateList={updateList}
            />
          ) : (
            !updateForm && <Button title="Crear" onPress={crear} />
          )}
          {updateForm && (
            <TareaUpdate
              item={tarea}
              setUpdateList={setUpdateList}
              setUpdate={setUpdateForm}
              setCreate={setCreateForm}
              updateList={updateList}
            />
          )}

          <Text>Tareas:</Text>
          <FlatList
            data={tareas ?? tasks}
            renderItem={({ item }) => (
              <Item
                id={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {role === "ROLE_VOLUNTEER" && (
        <TareaVoluntarioScreen setIsLoggedIn={setIsLoggedIn} route={route} />
      )}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
  },
  courseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});

export default TasksScreen;
