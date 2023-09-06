import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import PicContainer from "./PicContainer";
import Data from "../raw.json";

const windowHeight = Dimensions.get("window").height;
function Collection() {
  return (
    <FlatList
      data={Data}
      renderItem={({ item }) => <PicContainer data={item} />}
      keyExtractor={Data.date}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 8,
    marginBottom: windowHeight*0.12,
  },
});

export default Collection;
