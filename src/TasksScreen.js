import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { listTasks, logout, getRoleBasedOnToken, saveTask } from "./api";

const TasksScreen = ({ setIsLoggedIn, route }) => {
  const [tasks, setTasks] = useState([]);

  const { tareas } = route.params;

  const all = async () => {
    try {
      const data = await listTasks();
      setTasks(data.content);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const getRole = async () => {
    try {
      const data = await getRoleBasedOnToken();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const createTask = async () => {
    try {
      const data = await saveTask();
      console.log(data);
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  useEffect(() => {
    getRole();
    all();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  const Item = ({ name, ubication }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{ubication}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Tareas:</Text>
      <FlatList
        data={tareas}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.name} ubication={item.ubication} />
        )}
        keyExtractor={(item) => item.id}
      />

      <Button onPress={createTask} title="Crear nueva tarea" color="#841584" />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  courseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TasksScreen;
