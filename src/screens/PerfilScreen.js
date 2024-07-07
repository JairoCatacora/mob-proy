import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { getRoleBasedOnToken, logout } from "../api";
import { getCoordinadorPerfil, getVoluntarioPerfil } from "../api";
import { ROLE_COORDINATOR, ROLE_VOLUNTEER } from "../constants/role";

const PerfilScreen = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("");
  const [perfil, setPerfil] = useState("");

  const getRole = async () => {
    try {
      const data = await getRoleBasedOnToken();
      setRole(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const getPerfil = async () => {
    const role = await getRoleBasedOnToken();
    setRole(role);

    if (role === ROLE_COORDINATOR) {
      const data = await getCoordinadorPerfil();
      setPerfil(data);
    }

    if (role === ROLE_VOLUNTEER) {
      const data = await getVoluntarioPerfil();
      setPerfil(data);
    }
  };

  useEffect(() => {
    getRole();
    getPerfil();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>Nombre: {perfil.name}</Text>
      <Text>Correo: {perfil.email}</Text>
      <Text>Telefono: {perfil.phone}</Text>

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

export default PerfilScreen;
