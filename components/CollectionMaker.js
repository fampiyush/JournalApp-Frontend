import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Dimensions } from "react-native";
import React, { useState, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { uploadImage } from '../utils/aws-upload';
import { authContext } from '../utils/auth-Context';
import { collectionService } from '../services/allServices';
import uuid from 'react-native-uuid'
import * as SecureStore from 'expo-secure-store';

const windowHeight = Dimensions.get("window").height;
const CollectionMaker = ({setCollectionMaker}) => {
  
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [warning, setWarning] = useState(null)
  const [nameWarning, setNameWarning] = useState(false)
  const [loading, setLoading] = useState(false)

  const {userData, setTriggerRefresh} = useContext(authContext)

  const pickImage = async () => {
    if(!hasGalleryPermission){
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    })

    if(!result.canceled){
      const img = await manipulateAsync(result.assets[0].uri,[],{compress: 0.2, format: SaveFormat.JPEG})
      setImage(img.uri)
      setWarning(null)
    }else {
      setWarning("Image not Selected. Please tap on crop after cropping")
    }
  }

  const create = async() => {
    if(name.length == 0){
      setNameWarning(true)
      return
    }

    setLoading(true)
    const collection_id = uuid.v4()

    if(image){
      await uploadImage(image, userData.id, 'collection', collection_id)
    }

    const data = {
      name,
      collection_id,
      collection_img: image ? true : false
    }

    const t = await SecureStore.getItemAsync('user_token')
    await collectionService.uploadCollection(t, data)
      .then((res) => {
        console.log(res.data.message)
        setTriggerRefresh(Math.random())
        setLoading(false)
        setCollectionMaker(false)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const handleName = (e) => {
    setName(e)
    if(e.length > 0){
      setNameWarning(false)
    }
  }

  return (
    <View style={{ marginTop: 25, alignItems: "center" }} pointerEvents={loading ? 'none' : 'auto'}>
    {
      loading &&
      <View style={{justifyContent: 'center', position: 'absolute', top: windowHeight*0.4, right: 0, left: 0, zIndex: 99}}>
        <ActivityIndicator size='large' color='#daa0e2' />
      </View>
    }
      <Text style={{ color: "#E6DFE6", fontSize: 18, fontWeight: 600 }}>
        Create Collection
      </Text>
      <View
        style={{
          width: "90%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginTop: 22,
          marginBottom: 4,
        }}
      >
        <TextInput placeholder="Collection Name" placeholderTextColor='#ccc' maxLength={40} style={{color: '#E6DFE6'}} onChangeText={handleName} />
      </View>
      {
        nameWarning &&
        <Text style={{color: '#dc3545', fontSize: 12}}>Please enter collection name</Text>
      }
      <View style={{ alignItems: "center", marginTop: 8}}>
        {
          image ?
          <Image source={{uri: image}} style={{width: 400, height: 300, borderRadius: 10}} />
          :
            <FontAwesome name="picture-o" size={300} color="#E6DFE6" />
        }
        <View style={{ flexDirection: "row", marginTop: 8, }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C261CF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginBottom: 8,
              marginRight: 10,
              paddingHorizontal: 10,
            }}
            onPress={pickImage}
          >
            <Text style={{ color: "#fff" }}>Add Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: image ? "#C261CF" : "#909396",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginBottom: 8,
              paddingHorizontal: 10,
            }}
            disabled={image ? false : true}
            onPress={() => setImage(null)}
          >
            <Text style={{ color: "#fff" }}>Delete Picture</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: '#dc3545', fontSize: 12}}>{warning}</Text>
      </View>
      <TouchableOpacity
            style={{
              backgroundColor: "#C261CF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginTop: 8,
              marginBottom: 8,
              paddingHorizontal: 10,
              width: '90%'
            }}
            onPress={create}
          >
            <Text style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>Create Collection</Text>
          </TouchableOpacity>
    </View>
  );
};

export default CollectionMaker;
