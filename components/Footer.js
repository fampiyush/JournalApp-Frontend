import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
function Footer({setTab, getTab}) {
//   const [currentTab, setCurrentTab] = useState(2);

  return (
    <View style={styles.container}>
      <View style={styles.inContainer}>
        <Pressable style={styles.tabCont} onPress={() => setTab(1)}>
          <Icon
            name="images"
            size={28}
            color={getTab() == 1 ? "#C261CF" : "#1f1f1f"}
          />
          <View
            style={{
              backgroundColor: getTab() == 1 ? "#C261CF" : "#E6DFE6",
              height: 3,
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          ></View>
        </Pressable>
        {/* <View style={[styles.tabContPlus, {backgroundColor: '#E6DFE6', marginTop: -12}]}> */}
        <Pressable style={{width: '20%', alignItems: 'center'}}>
          <AntDesign
            name="pluscircle"
            size={56}
            color="#C261CF"
            style={{ margin: -14 }}
          />
        </Pressable>
        {/* </View> */}
        <Pressable style={styles.tabCont} onPress={() => setTab(2)}>
          <Icon
            name="users"
            size={28}
            color={getTab() == 2 ? "#C261CF" : "#1f1f1f"}        
          />
          <View
            style={{
              backgroundColor: getTab() == 2 ? "#C261CF" : "#E6DFE6",
              height: 3,
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          ></View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#1f1f1f",
    // shadowColor: '#C261CF',
    // elevation: 2,
    width: "100%",
    height: windowHeight * 0.08,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: '#daa0e2',
    // borderWidth: 1,
  },
  inContainer: {
    backgroundColor: "#E6DFE6",
    width: "90%",
    height: "60%",
    borderRadius: 15,
    // alignItems: 'center',
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  tabCont: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  tabContPlus: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#C261CF",
    borderWidth: 0.5,
  },
});

export default Footer;
