import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen";
import TasksScreen from "./src/TasksScreen";
import EmergenciaNaturalScreen from "./src/EmergenciaNaturalScreen";
import LugaresScreen from "./src/LugaresScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({ setIsLoggedIn }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login">
      {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppTabs = ({ setIsLoggedIn }) => (
  <Tab.Navigator initialRouteName="Lugares">
    <Tab.Screen name="Tareas">
      {(props) => <TasksScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Tab.Screen>
    <Tab.Screen name="EmergenciaNatural">
      {(props) => (
        <EmergenciaNaturalScreen {...props} setIsLoggedIn={setIsLoggedIn} />
      )}
    </Tab.Screen>
    <Tab.Screen name="Lugares">
      {(props) => <LugaresScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;
