import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from 'react';
import { Dimensions } from "react-native";
import { authContext } from '../utils/auth-Context';
import { authService } from '../services/allServices';
import * as SecureStore from 'expo-secure-store';


const windowHeight = Dimensions.get("window").height;
export default function Index({navigation}) {
  
  const [loading, setLoading] = useState(false);
  const {userData, setUserData} = useContext(authContext)

  useEffect(() => {
    setLoading(true)
    const getUser = async() => {
        const t = await SecureStore.getItemAsync('user_token')
        await authService.getUser(t)
            .then(async(res) => {
                setUserData(res.data)
                await new Promise(resolve => setTimeout(resolve, 1000))
                navigation.reset({
                  index: 0,
                  routes: [{name: 'DpUpload'}]
                })
            })
            .catch(async(err) => {
                console.log(err.response.data.message);
                await new Promise(resolve => setTimeout(resolve, 1000))
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}]
                })
            })
           setLoading(false)
    }
    getUser()
  },[])
  
  return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#121212" style="light" />
        {
          (loading) &&
          <View style={{alignItems: 'center', justifyContent: 'center', height: windowHeight, width: '100%'}}>
            <Text style={{color: '#E6DFE6', fontSize: 16}}>Splash Screen</Text>
          </View>
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
