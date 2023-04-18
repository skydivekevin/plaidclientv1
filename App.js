import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";
import { QuotesProvider } from "./context/QuotesContext";

import MainApp from "./MainApp";

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <QuotesProvider>
          <MainApp />
        </QuotesProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
