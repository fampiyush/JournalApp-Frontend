import React, {useState} from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CollageData from "../CollageData.json";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
function Collage({collection_id}) {
  
  const [itemId, setItemId] = useState(0)

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <View style={styles.card}>
          <View style={styles.contentCont}>
            {item.imgURI && (
              <Image
                source={require("../assets/stars.jpg")}
                style={{
                  height: screenHeight * 0.33,
                  width: "100%",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
            )}
            <ScrollView
              style={[styles.captionContainer, {height: item.imgURI ? screenHeight * 0.42 : screenHeight * 0.75,}]}
              persistentScrollbar={true}
            >
              <Text style={styles.caption}>{item.caption}</Text>
            </ScrollView>
          </View>
        </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={CollageData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight * 0.8}
        itemWidth={screenWidth * 0.8}
        itemHeight={screenHeight * 0.8}
        windowSize={6}
        onSnapToItem={(index) => setItemId(index)}
      />
      {/* <View style={{position: 'absolute', bottom: 50, alignItems: 'center', width: '100%'}}>
        <Pagination dotsLength={CollageData.length} activeDotIndex={itemId} dotStyle={{backgroundColor: '#E6DFE6'}} />
      </View> */}
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
  },
  contentCont: {
    backgroundColor: '#ebe5eb',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
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
});

export default Collage;
