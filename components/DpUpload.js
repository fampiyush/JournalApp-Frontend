import { View, Text, SafeAreaView, StatusBar, Keyboard, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { uploadImage } from '../utils/aws-upload';
import { authContext } from '../utils/auth-Context';

const windowHeight = Dimensions.get("window").height;
const DpUpload = ({navigation}) => {
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [warning, setWarning] = useState(null)
  const [loading, setLoading] = useState(false)

  const {userData, setUserData} = useContext(authContext)
  
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  },[])

  const pickImage = async () => {
    if(!hasGalleryPermission){
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 8],
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

  const onNext = async() => {
    if(image){
      setLoading(true)
      await uploadImage(image, userData.id, 'profilepicture')
      setLoading(false)
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}]
    })
  }


  return (
    <SafeAreaView
      style={{
        height: windowHeight + StatusBar.currentHeight,
        backgroundColor: "#121212",
        paddingHorizontal: 16,
      }}
    >
    {
      loading &&
      <View style={{justifyContent: 'center', position: 'absolute', top: windowHeight*0.4, right: 0, left: 0, zIndex: 99}}>
        <ActivityIndicator size='large' color='#daa0e2' />
      </View>
    }
    <View
        style={{
          backgroundColor: "#E6DFE6",
          padding: 8,
          height: windowHeight * 0.6,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          zIndex: 3,
          position: 'relative',
          top: isKeyboardVisible ? StatusBar.currentHeight : windowHeight*0.2,
          alignItems: 'center',
          opacity: loading ? 0.1 : 1
        }}
        pointerEvents={loading ? 'none' : 'auto'}
      >
        <Text style={{color: '#C261CF', position: 'absolute', top: 20, fontSize: 20}}>Profile Picture</Text>
        <View style={{marginTop: '40%', alignItems: 'center'}}>
          {
            image ?
            <Image source={{uri: image}} style={{width: 100, height: 100, borderRadius: 50}} />
            :
            <FontAwesome name="user-circle" size={100} color="#73849e" />
          }
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: "#C261CF",
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginBottom: 8,
                marginTop: 20,
                marginRight: 10,
                paddingHorizontal: 10
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
                marginTop: 20,
                paddingHorizontal: 10
              }}
              disabled = {image ? false : true}
              onPress={() => setImage(null)}
            >
              <Text style={{ color: "#fff" }}>Delete Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{color: '#dc3545', fontSize: 12}}>{warning}</Text>
        </View>
        <View style={{position: 'absolute', bottom: 10, right: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: "#C261CF",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginBottom: 8,
              marginTop: 20,
              paddingHorizontal: 10,
              flexDirection: 'row'
            }}
            onPress={onNext}
          >
            <Text style={{ color: "#fff", marginRight: 5 }}>{image ? 'Next' : 'Skip'}</Text>
            <FontAwesome5 name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#E6DFE6",
          height: windowHeight * 0.6,
          zIndex: 2,
          width: "100%",
          right: 12,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          top: isKeyboardVisible ? StatusBar.currentHeight+4 : windowHeight*0.205
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#E6DFE6",
          height: windowHeight * 0.6,
          zIndex: 1,
          width: "100%",
          right: 8,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          top: isKeyboardVisible ? StatusBar.currentHeight+8 : windowHeight*0.21
        }}
      ></View>  
    </SafeAreaView>
  )
}

export default DpUpload