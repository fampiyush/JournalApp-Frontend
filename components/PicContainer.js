import React, { useState, memo, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable
} from "react-native";
import Collage from "./Collage";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import ModalMenu from "react-native-modal";
import * as SecureStore from 'expo-secure-store';
import { collectionService } from '../services/allServices';
import { authContext } from '../utils/auth-Context';

const windowHeight = Dimensions.get("window").height;
function PicContainer({ data }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

  const {setTriggerRefresh} = useContext(authContext)

  const onOpen = (id) => {
    setModalVisible(true);
  };

  const onDelete = async() => {
    const t = await SecureStore.getItemAsync('user_token')
    const d = {
      collection_id: data.collection_id
    }
    await collectionService.deleteCollection(t, d)
    .then((res) => {
      setConfirmDeleteModal(false)
      setTriggerRefresh(Math.random())
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
  }

  return (
    <View>
        <View style={{ overflow: "visible", marginTop: 15 }}>
          <View style={styles.picContainer}>
            <Pressable style={{position: 'absolute', right: -10, top: -15, zIndex: 99}} onPress={() => setConfirmDeleteModal(true)}>
              <Entypo name="circle-with-cross" size={32} color="#C261CF" />
            </Pressable>
            <View style={{position: 'absolute', right: -3, top: -8}}>
              <View style={{backgroundColor: '#E6DFE6', width: 16, height: 24}}></View>
            </View>
          {
            data.collection_imguri ?
            <Image
              source={{uri: data.collection_imguri}}
              style={styles.pictures}
            />
            :
            <View style={{alignItems: 'center'}}>
              <FontAwesome name="picture-o" size={280} color="#73849e" />
            </View>
          }
            <View style={styles.captionCont}>
              <Text style={styles.captions}>{data.collection_name}</Text>
            </View>
            <View style={{ alignItems: "center", height: "100%" }}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => onOpen(data.collection_id)}
              >
                <Text style={{ color: "#E6DFE6" }}>OPEN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.page1}></View>
          <View style={styles.page2}></View>
        </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <BlurView tint="dark" intensity={50}>
          <View style={styles.modalContainer}>
            <View  style={styles.modalContent}>
            <Collage collection_id={data.collection_id} />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                backgroundColor: "#E6DFE6",
                width: 35,
                height: 45,
              }}
            ></View>
            <Entypo
              name="circle-with-cross"
              size={72}
              color="#C261CF"
              style={{ position: "absolute", bottom: 5 }}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </BlurView>
      </Modal>
      
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
            height: windowHeight*0.3,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{color: '#E6DFE6', fontSize: 16}}>Are you sure you want to delete collection "{data.collection_name}"</Text>
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
  date: {
    marginBottom: 16,
    color: "#C261CF",
  },
  picContainer: {
    marginBottom: 16,
    backgroundColor: "#E6DFE6",
    height: windowHeight * 0.45 - 3,
    width: "98%",
    flexDirection: "column",
    padding: 8,
    borderRadius: 5,
    borderColor: "#daa0e2",
    borderWidth: 1,
    zIndex: 3,
  },
  headCont: {
    marginTop: -4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  picHead: {
    fontWeight: "bold",
    fontSize: 22,
  },
  pictures: {
    borderRadius: 10,
    width: "100%",
    height: "75%",
    resizeMode: "stretch",
  },
  captionCont: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  captions: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "sans-serif-medium",
  },
  page1: {
    position: "absolute",
    backgroundColor: "#E6DFE6",
    height: windowHeight * 0.45 + 3,
    width: "99%",
    zIndex: 2,
    right: 0,
    borderRadius: 5,
    borderColor: "#daa0e2",
    borderWidth: 1,
  },
  page2: {
    position: "absolute",
    backgroundColor: "#E6DFE6",
    height: windowHeight * 0.45,
    width: "99%",
    zIndex: 2,
    right: 3,
    borderRadius: 5,
    borderColor: "#daa0e2",
    borderWidth: 1,
  },
  buttons: {
    backgroundColor: "#C261CF",
    width: "20%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  modalContainer: {
    alignItems: "center",
    height: "100%",
  },
  modalContent: {
    marginTop: 40,
  }
});

export default memo(PicContainer);
