import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import { useEffect, useState } from 'react';
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
export default function App() {
  
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const splashTime = setTimeout(() => setShowSplash(false), 2000)

    return () => {
      clearTimeout(splashTime)
    }
  },[])
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" style="light" />
      {
        showSplash ?
        <View style={{alignItems: 'center', justifyContent: 'center', height: windowHeight, width: '100%'}}>
          <Text style={{color: '#E6DFE6', fontSize: 16}}>Splash Screen</Text>
        </View>
        :
      <Home />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#121212",
  },
  status: {
    color: "#fff",
  },
});
