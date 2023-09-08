import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import NavBar from "./NavBar";
import Collection from "./Collection";
import Shared from "./Shared";
import Footer from "./Footer";
import {useRoute} from '@react-navigation/native'

function Home({navigation}) {
  
  const route = useRoute()

  return (
    <SafeAreaView style={styles.container}>
      <NavBar style={styles.nav} />
      <View style={{display: route.params.component == 'Collection' ? 'flex' : 'none'}}>
        <Collection style={styles.collection} />
      </View>
      <View style={{display: route.params.component == 'Shared' ? 'flex' : 'none'}}>
        <Shared style={styles.shared} />
      </View>
      <Footer style={styles.footer} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    paddingTop: 8,
    flex: 1,
  },
  nav: {
    flex: 1,
  },
  collection: {
    flex: 3,
  },
  footer: {
    flex: 1,
  },
  shared: {
    zIndex: 3
  }
});

export default Home;
