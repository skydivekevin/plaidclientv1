import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";
import { QuotesProvider } from "./context/QuotesContext";
import { ApiProvider } from "./context/ApiContext";

import MainApp from "./MainApp";
import { PropertyProvider } from "./context/PropertyContext";

export default function App() {
  return (
    <ApiProvider>
      <NavigationContainer>
        <UserProvider>
          <QuotesProvider>
            <PropertyProvider>
              <MainApp />
            </PropertyProvider>
          </QuotesProvider>
        </UserProvider>
      </NavigationContainer>
    </ApiProvider>
  );
}
