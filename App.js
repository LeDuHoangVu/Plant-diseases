
import { StyleSheet, Text, View,LogBox } from 'react-native';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from './tab';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();
LogBox.ignoreAllLogs();
export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer >
        <TabNav ></TabNav>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
// registerRootComponent(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
