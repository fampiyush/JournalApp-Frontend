import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import NavBar from "./NavBar";
import Collection from "./Collection";
import Shared from "./Shared";
import Footer from "./Footer";

function Home() {
  const [currentTab, setCurrentTab] = useState(1);

  const setTab = (value) => {
    setCurrentTab(value);
  };

  const getTab = () => {
    return currentTab;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar style={styles.nav} getTab={getTab} />
      {currentTab == 1 ? <Collection style={styles.collection} /> : <Shared style={styles.shared} />}
      <Footer style={styles.footer} setTab={setTab} getTab={getTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 24,
    // paddingRight: 24,
    marginTop: 1,
    paddingTop: 42,
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
