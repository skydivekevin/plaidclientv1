import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./context/UserContext";
import { QuotesProvider } from "./context/QuotesContext";
import { ApiProvider } from "./context/ApiContext";
import { CartProvider } from "./context/CartContext";
import { PropertyProvider } from "./context/PropertyContext";

import MainApp from "./MainApp";

export default function App() {
  return (
    <ApiProvider>
          <QuotesProvider>
      <NavigationContainer>
        <UserProvider>
            <PropertyProvider>
              <CartProvider>
                <MainApp />
              </CartProvider>
            </PropertyProvider>
        </UserProvider>
      </NavigationContainer>
          </QuotesProvider>
    </ApiProvider>
  );
}
