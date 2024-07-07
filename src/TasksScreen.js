import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { listTasks, logout, getRoleBasedOnToken, saveTask } from "./api";

const TasksScreen = ({ setIsLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState();

  const getTasks = async () => {
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
    getTasks();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Tareas:</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
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