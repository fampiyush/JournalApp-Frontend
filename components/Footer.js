import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { AntDesign } from "@expo/vector-icons";
import {useRoute} from '@react-navigation/native'

const windowHeight = Dimensions.get("window").height;
function Footer({navigation}) {
  
  const route = useRoute()

  return (
    <View style={styles.container}>
      <View style={styles.inContainer}>
        <Pressable style={styles.tabCont} onPress={() => navigation.navigate('Home', {component: 'Collection'})}>
          <Icon
            name="images"
            size={28}
            color={route.params.component == 'Collection' ? "#C261CF" : "#1f1f1f"}
          />
          <View
            style={{
              backgroundColor: route.params.component == 'Collection' ? "#C261CF" : "#E6DFE6",
              height: 3,
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          ></View>
        </Pressable>
        <Pressable style={{width: '20%', alignItems: 'center'}}>
          <AntDesign
            name="pluscircle"
            size={56}
            color="#C261CF"
            style={{ margin: -14 }}
          />
        </Pressable>
        <Pressable style={styles.tabCont} onPress={() => navigation.navigate('Home', {component: 'Shared'})}>
          <Icon
            name="users"
            size={28}
            color={route.params.component == 'Shared' ? "#C261CF" : "#1f1f1f"}        
          />
          <View
            style={{
              backgroundColor: route.params.component == 'Shared' ? "#C261CF" : "#E6DFE6",
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
    width: "100%",
    height: windowHeight * 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  inContainer: {
    backgroundColor: "#E6DFE6",
    width: "90%",
    height: "60%",
    borderRadius: 15,
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
