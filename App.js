import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";

import Main from "./Main";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Main />
      </UserProvider>
    </NavigationContainer>
  );
}
