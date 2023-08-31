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

const windowHeight = Dimensions.get("window").height;
function PicContainer({ data }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onOpen = (id) => {
    setModalVisible(true);
  };

  return (
    <View>
      <Text style={styles.date}>{data.date}</Text>
      {data.data.map((item) => (
        <View key={item.id} style={{ overflow: "visible" }}>
          <View style={styles.picContainer}>
            <Image
              source={require("../assets/stars.jpg")}
              style={styles.pictures}
            />
            <View style={styles.captionCont}>
              <Text style={styles.captions}>{item.caption}</Text>
            </View>
            <View style={{ alignItems: "center", height: "100%" }}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => onOpen(item.id)}
              >
                <Text style={{ color: "#E6DFE6" }}>OPEN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.page1}></View>
          <View style={styles.page2}></View>
        </View>
      ))}
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
    // marginBottom: 16,
  },
  picContainer: {
    marginBottom: 16,
    // marginLeft: 8,
    // marginRight: 8,
    backgroundColor: "#E6DFE6",
    height: windowHeight * 0.45 - 3,
    width: "98%",
    flexDirection: "column",
    // alignItems: 'center',
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
    // backgroundColor: '#000'
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
    // justifyContent: 'center',
    height: "100%",
  },
  modalContent: {
    marginTop: 40,
  }
});

export default memo(PicContainer);
