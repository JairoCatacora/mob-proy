import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.18.12:8080";

export const getRoleBasedOnToken = async () => {
  const token = await AsyncStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
};

export const getPerfil = async () => {
  const perfil = await AsyncStorage.getItem("perfil");
  return JSON.parse(perfil);
};

export const getCoordinadorPerfil = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/coordinador/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await AsyncStorage.setItem("perfil", JSON.stringify(response.data));

  return response.data;
};

export const getVoluntarioPerfil = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/voluntarios/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await AsyncStorage.setItem("perfil", JSON.stringify(response.data));

  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  await AsyncStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = async (name, email, password, phone, isCoordinator) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    phone,
    isCoordinator,
  });
  return response.data;
};

export const listTasks = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/tareas/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveTask = async (title, description, status, planId, lugarId) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/tareas/`,
    {
      title,
      description,
      status,
      planId,
      lugarId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateTarea = async (
  id,
  title,
  description,
  status,
  planId,
  lugarId,
  suministros
) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/tareas/${id}`,
    {
      id,
      title,
      description,
      status,
      planId,
      lugarId,
      suministros,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const completarTarea = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/tareas/complete/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const participarTarea = async (id, idVoluntario) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/tareas/${id}/assign/${idVoluntario}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const tareasDisponibles = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/tareas/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.filter((item) => {
    if (item.status !== "COMPLETED") {
      return item;
    }
  });
};

export const saveEmergenciaNatural = async (name, description, importance) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/emergenciaNatural/`,
    {
      name,
      description,
      importance,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteEmergenciaNatural = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/emergenciaNatural/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateEmergenciaNatural = async (
  id,
  name,
  description,
  importance
) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/emergenciaNatural/${id}`,
    {
      name,
      description,
      importance,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const listEmergenciaNatural = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/emergenciaNatural/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const listLugares = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/lugar/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createLugar = async (name, ubication) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/lugar/`,
    {
      name,
      ubication,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateLugar = async (id, name, ubication) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/lugar/${id}`,
    {
      name,
      ubication,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteLugar = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/lugar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createPlan = async (name, description, state) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/plans/`,
    {
      name,
      description,
      state,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updatePlan = async (id, name, description, state) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/plans/${id}`,
    {
      name,
      description,
      state,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const listPlans = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/plans/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const planesDisponibles = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/plans/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.filter((item) => {
    if (
      item.state !== "REJECTED" ||
      item.state !== "CANCELLED" ||
      item.state !== "COMPLETED"
    ) {
      return item;
    }
  });
};

export const createSuministro = async (name, stock, tareaId) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/suministro`,
    {
      name,
      stock,
      tareaId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const actualizarSuministro = async (id, name, stock) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/suministro/${id}`,
    {
      name,
      stock,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const eliminarSuministro = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/suministro/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePlan = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/plans/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const participatePlan = async (id, idCordinador) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/plans/${id}/coordinador/${idCordinador}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTarea = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/tareas/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const listSuministros = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${API_URL}/suministro/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const asignarSuministroATarea = async (id, idTarea) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/suministro/${id}/tarea/${idTarea}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("perfil");
};
