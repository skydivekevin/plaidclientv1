import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";
import { QuotesProvider } from "./context/QuotesContext";
import { ApiProvider } from "./context/ApiContext";

import MainApp from "./MainApp";

export default function App() {
  return (
    <ApiProvider>
      <NavigationContainer>
        <UserProvider>
          <QuotesProvider>
            <MainApp />
          </QuotesProvider>
        </UserProvider>
      </NavigationContainer>
    </ApiProvider>
  );
}
