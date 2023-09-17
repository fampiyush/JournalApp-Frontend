import React, { useState, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import Collage from "./Collage";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
function PicContainer({ data }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onOpen = (id) => {
    setModalVisible(true);
  };

  return (
    <View>
        <View key={data.collection_id} style={{ overflow: "visible" }}>
          <View style={styles.picContainer}>
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
            <Collage />
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
