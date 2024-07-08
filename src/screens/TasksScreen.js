import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getRoleBasedOnToken } from "../api";
import { ROLE_COORDINATOR, ROLE_VOLUNTEER } from "../constants/role";
import TareaCoordinadorScreen from "./coordinador/TareaCoordinadorScreen";
import TareaVoluntarioScreen from "./voluntario/TareaVoluntarioScreen";

const TasksScreen = ({ route }) => {
  const [role, setRole] = useState("");

  const tareas = route.params?.tareas;

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
  }, []);

  return (
    <View style={styles.container}>
      {role === ROLE_COORDINATOR && <TareaCoordinadorScreen route={route} />}

      {role === ROLE_VOLUNTEER && <TareaVoluntarioScreen route={route} />}
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
