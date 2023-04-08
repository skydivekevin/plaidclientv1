import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";

import MainApp from "./MainApp";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </NavigationContainer>
  );
}
