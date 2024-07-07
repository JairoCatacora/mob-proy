import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import EmergenciaNaturalScreen from "./src/screens/coordinador/EmergenciaNaturalScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LugaresScreen from "./src/screens/coordinador/LugaresScreen";
import PlanScreen from "./src/screens/coordinador/PlanScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TasksScreen from "./src/screens/TasksScreen";
import SuministroScreen from "./src/screens/coordinador/SuministroScreen";
import { ROLE_COORDINATOR } from "./src/constants/role";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({ setIsLoggedIn, setRole }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login">
      {(props) => (
        <LoginScreen
          {...props}
          setIsLoggedIn={setIsLoggedIn}
          setRole={setRole}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppCoordinadorTabs = ({ setIsLoggedIn }) => (
  <Tab.Navigator initialRouteName="Tareas">
    <Tab.Screen name="Tareas">
      {(props) => <TasksScreen {...props} />}
    </Tab.Screen>
    <Tab.Screen name="EmergenciaNatural">
      {(props) => <EmergenciaNaturalScreen {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Lugares">
      {(props) => <LugaresScreen {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Plan">{(props) => <PlanScreen {...props} />}</Tab.Screen>
    <Tab.Screen name="Suministro">
      {(props) => <SuministroScreen {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Perfil">
      {(props) => <PerfilScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const AppVoluntarioTabs = ({ setIsLoggedIn }) => (
  <Tab.Navigator initialRouteName="Tareas">
    <Tab.Screen name="Tareas">
      {(props) => <TasksScreen {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Perfil">
      {(props) => <PerfilScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        role === ROLE_COORDINATOR ? (
          <AppCoordinadorTabs setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AppVoluntarioTabs setIsLoggedIn={setIsLoggedIn} />
        )
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
      )}
    </NavigationContainer>
  );
};

export default App;
