import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from "react-native";
import NavBar from "./NavBar";
import Collection from "./Collection";
import Shared from "./Shared";
import Footer from "./Footer";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { authService } from "../services/allServices";
import ModalMenu from "react-native-modal";
import SideMenu from './SideMenu';

const windowHeight = Dimensions.get("window").height;
function Home({ navigation }) {
  const [menuStatus, setMenuStatus] = useState(false);

  const route = useRoute();

  const showImage = async () => {
    const t = await SecureStore.getItemAsync("user_token");
    await authService
      .getProfilePic(t)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar style={styles.nav} setMenuStatus={setMenuStatus} />
      <View
        style={{
          display: route.params.component == "Collection" ? "flex" : "none",
        }}
      >
        <Collection style={styles.collection} />
      </View>
      <View
        style={{
          display: route.params.component == "Shared" ? "flex" : "none",
        }}
      >
        <Shared style={styles.shared} />
      </View>
      <Footer style={styles.footer} navigation={navigation} />

      <ModalMenu
        isVisible={menuStatus}
        onBackdropPress={() => setMenuStatus(false)}
        onBackButtonPress={() => setMenuStatus(false)}
        transparent={true}
        onSwipeComplete={() => setMenuStatus(false)}
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        swipeDirection='left'
        hideModalContentWhileAnimating
        propagateSwipe
        swipeThreshold={50}
        useNativeDriverForBackdrop
        style={{margin: 0}}
      >       
        <View
          style={{
            backgroundColor: "#121212",
            width: "70%",
            height: windowHeight,
          }}
        >
          <SideMenu />
        </View>
      </ModalMenu>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
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
    zIndex: 3,
  },
});

export default Home;
