import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.18.12:8080";

export const getRoleBasedOnToken = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  await AsyncStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = async (name, email, password, phone, isTeacher) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    phone,
    isTeacher,
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

export const saveTask = async (title, description, dueDate) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/tareas/`,
    {
      title,
      description,
      dueDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const savePlan = async (name, description, emergenciaNatural) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/plans/`,
    {
      name,
      description,
      state,
      tasks,
      coordinadores,
      emergenciaNatural,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
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

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};
