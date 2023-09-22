import React, {useEffect, useState, useContext} from "react";
import { authContext } from '../utils/auth-Context';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { slideService } from '../services/allServices';
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import uuid from 'react-native-uuid'
import { uploadImage } from '../utils/aws-upload';
import ModalMenu from "react-native-modal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
function Collage({collection_id}) {
  
  const [itemId, setItemId] = useState(0)
  const [collageData, setCollageData] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [image, setImage] = useState(null)
  const [warning, setWarning] = useState('')
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [tobeDeleted, setToBeDeleted] = useState(0);

  const {userData} = useContext(authContext)

  useEffect(() => {
    const fetch = async() => {
      const t = await SecureStore.getItemAsync('user_token')
      const data = {
        collection_id
      }
      const edit = {
        type: 'edit'
      }
      await slideService.getAllSlide(t, data)
        .then((res) => {
          setCollageData([...res.data, {...edit}])
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    }
    fetch()
  },[refresh])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

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
    setLoading(true)
    const slide_id = uuid.v4()

    if(image){
      await uploadImage(image, userData.id, 'collection', slide_id)
    }

    const data = {
      slide_id,
      text,
      collection_id,
      slide_isimage: image ? true : false
    }

    const t = await SecureStore.getItemAsync('user_token')
    await slideService.uploadSlide(t, data)
      .then((res) => {
        console.log(res.data.message)
        setRefresh(Math.random())
        setEditMode(false)
        setImage(null)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data.message)
        setLoading(false)
      })
  }

  const onDelete = async() => {
    setLoading(true)
    const t = await SecureStore.getItemAsync('user_token')
    const d = {
      slide_id: tobeDeleted
    }
    await slideService.deleteSlide(t, d)
    .then((res) => {
      setConfirmDeleteModal(false)
      setRefresh(Math.random())
      setLoading(false)
    })
    .catch((err) => {
      console.log(err.response.data.message)
      setLoading(false)
    })
  }

  const handleText = (e) => {
    setText(e)
  }

  const handleDeletePress = (e) => {
    setConfirmDeleteModal(true)
    setToBeDeleted(e)
  }

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  const renderItem = ({ item, index }) => {
    return (
        <View style={styles.card}>
          <View style={[styles.contentCont, {elevation: isKeyboardVisible ? 0 : 10}]}>
          {
            item.type == 'edit' ?
            <>
              {
                editMode ?
                <>
                <View style={{opacity: isKeyboardVisible ? 0 : 1, width: '99%'}}>
                <View style={{ alignItems: "center", marginTop: 0}}>
                    {
                      image ?
                      <Image source={image} style={{width: '100%', height: screenHeight * 0.3, borderRadius: 10}} placeholder={blurhash} />
                      :
                        <FontAwesome name="picture-o" size={screenHeight * 0.3} color="#E6DFE6" />
                    }
                    <Text style={{color: '#dc3545', fontSize: 12}}>{warning}</Text>
                    <View style={{ flexDirection: "row", marginTop: 2, }}>
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
                  </View>
                  </View>
                    <ScrollView
                      style={[styles.captionContainer, {height: screenHeight * 0.33 ,borderWidth: 1, width: '100%', borderColor: '#C261CF', position: isKeyboardVisible ? 'absolute' : 'relative', top: 0, zIndex: 99}]}
                      persistentScrollbar={true}
                    >
                      <TextInput placeholder="Write your description here..." style={{color: '#000', width: '100%', marginBottom: 16}} multiline onChangeText={handleText} />
                    </ScrollView>
                    <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-between'}}>
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
                        // width: '90%'
                        flex: 3
                      }}
                      onPress={create}
                    >
                      <Text style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>Create Slide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#909396",
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 5,
                        paddingHorizontal: 10,
                        // width: '90%'
                        flex: 2
                      }}
                      onPress={() => setEditMode(false)}
                    >
                      <Text style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </>
                :
                <>
                  <Pressable style={[styles.captionContainer, {height: screenHeight * 0.75, width: '100%' , justifyContent: 'center', alignItems: 'center', backgroundColor: '#bdbdbd'}]} onPress={() => setEditMode(true)}>
                    <View>
                      <AntDesign name="pluscircleo" size={72} color="#4a4a4a" />
                    </View>
                      <Text style={{marginTop: 16, fontSize: 16, fontWeight: 600}}>Add a Slide</Text>
                  </Pressable>
                </>
              }
            </>
            :
            <>
              <Pressable style={{position: 'absolute', right: -15, top: -25, zIndex: 99}} onPress={() => handleDeletePress(item.slide_id)}>
                <Entypo name="circle-with-cross" size={32} color="#C261CF" />
              </Pressable>
              {item.slide_imgurl && (
                <Image
                  source={item.slide_imgurl}
                  style={{
                    height: screenHeight * 0.33,
                    width: "100%",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  placeholder={blurhash}
                />
              )}
              <ScrollView
                style={[styles.captionContainer, {height: item.slide_imgurl ? screenHeight * 0.42 : screenHeight * 0.75,}]}
                persistentScrollbar={true}
              >
                <Text style={styles.caption}>{item.slide_text}</Text>
              </ScrollView>
            </>
          }
          </View>
        </View>
    );
  };

  return (
    <View style={styles.container}>
    {
      loading &&
      <View style={{justifyContent: 'center', position: 'absolute', top: screenHeight*0.4, right: 0, left: 0, zIndex: 99}}>
        <ActivityIndicator size='large' color='#daa0e2' />
      </View>
    }
    <View pointerEvents={loading ? 'none' : 'auto'}>
      <Carousel
        data={collageData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight * 0.8}
        itemWidth={screenWidth * 0.8}
        itemHeight={screenHeight * 0.8}
        windowSize={6}
        onSnapToItem={(index) => setItemId(index)}
      />
    </View>
    <ModalMenu
        isVisible={confirmDeleteModal}
        onBackdropPress={() => setConfirmDeleteModal(false)}
        onBackButtonPress={() => setConfirmDeleteModal(false)}
        transparent={true}
        onSwipeComplete={() => setConfirmDeleteModal(false)}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        swipeDirection='down'
        hideModalContentWhileAnimating
        propagateSwipe
        swipeThreshold={50}
        useNativeDriverForBackdrop
        style={{alignItems: 'center'}}
      >       
        <View
          style={{
            backgroundColor: "#121212",
            width: '90%',
            height: screenHeight*0.3,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{color: '#E6DFE6', fontSize: 16}}>Are you sure you want to delete this slide.</Text>
          <TouchableOpacity
            style={[styles.buttons, {height: 30, marginTop: 15, backgroundColor: '#dc3545'}]}
            onPress={onDelete}
          >
              <Text style={{ color: "#E6DFE6" }}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </ModalMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: "#E6DFE6",
    minHeight: screenHeight * 0.8,
    borderRadius: 5,
    borderColor: "#daa0e2",
    borderWidth: 1,
    marginTop: 10
  },
  contentCont: {
    backgroundColor: '#ebe5eb',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  captionContainer: {
    padding: 8,
    // marginTop: 16,
    // backgroundColor: '#eee1f0',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // elevation: 5,
  },
  caption: {
    // color: "#E6DFE6",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "sans-serif-medium",
    marginBottom: 5,
  },
  buttons: {
    backgroundColor: "#C261CF",
    width: "20%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default Collage;
