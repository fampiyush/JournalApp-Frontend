import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import { useContext, useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import LoginScreen from './LoginScreen';
import { authContext } from '../utils/auth-Context';
import { authService } from '../services/allServices';
import * as SecureStore from 'expo-secure-store';


const windowHeight = Dimensions.get("window").height;
export default function Index() {
  
  const [showSplash, setShowSplash] = useState(true)
  const [loading, setLoading] = useState(false);
  const {userData, setUserData} = useContext(authContext)

  useEffect(() => {
    const splashTime = setTimeout(() => setShowSplash(false), 2000)

    return () => {
      clearTimeout(splashTime)
    }
  },[])

  useEffect(() => {
    setLoading(true)
    const getUser = async() => {
        const t = await SecureStore.getItemAsync('user_token')
        await authService.getUser(t)
            .then((res) => {
                setUserData(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
            setLoading(false)
    }
    getUser()
  },[])
  
  return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#121212" style="light" />
        {
          (showSplash || loading) ?
          <View style={{alignItems: 'center', justifyContent: 'center', height: windowHeight, width: '100%'}}>
            <Text style={{color: '#E6DFE6', fontSize: 16}}>Splash Screen</Text>
          </View>
          :
            (
                userData.id ?
                <Home />
                :
                <LoginScreen />
            )
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
