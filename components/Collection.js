import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Dimensions } from "react-native";
import PicContainer from "./PicContainer";
import * as SecureStore from 'expo-secure-store';
import { collectionService } from '../services/allServices';
import { authContext } from '../utils/auth-Context';

const windowHeight = Dimensions.get("window").height;
function Collection() {
  
  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState(false)

  const {triggerRefresh} = useContext(authContext)

  useEffect(() => {
    const fetch = async() => {
      setLoading(true)
      const t = await SecureStore.getItemAsync('user_token')
      await collectionService.getAllCollection(t)
        .then((res) => {
            setCollection(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        setLoading(false)
    }
    fetch()
  },[triggerRefresh])

  return (
    <View>
    {
      loading ?
      <View style={{justifyContent: 'center', position: 'absolute', top: windowHeight*0.4, right: 0, left: 0, zIndex: 99}}>
        <ActivityIndicator size='large' color='#daa0e2' />
      </View>
      :
      <View>
        {
          collection.length != 0 ?
          <FlatList
            data={collection}
            renderItem={({ item }) => <PicContainer data={item} />}
            style={styles.container}
          />
          :
          <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <Text style={{color: '#E6DFE6'}}>You have no collections. Press on ➕ button to create one.</Text>
          </View>
        }
      </View>
      
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 16,
    marginBottom: windowHeight*0.12,
  },
});

export default Collection;
