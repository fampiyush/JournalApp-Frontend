import React from 'react'
import { View, Text } from 'react-native'
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
function Shared() {
  return (
    <View style={{height: windowHeight*0.8, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#E6DFE6', fontSize: 24}}>Sharing Feature</Text>
        <Text style={{color: '#E6DFE6', fontSize: 16}}>Coming Soon</Text>
    </View>
  )
}

export default Shared