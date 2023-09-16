import React, { useEffect, useState } from "react";
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
import CollectionMaker from './CollectionMaker';

const windowHeight = Dimensions.get("window").height;
function Home({ navigation }) {
  const [menuStatus, setMenuStatus] = useState(false);
  const [collectionMaker, setCollectionMaker] = useState(false);

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
      <Footer style={styles.footer} navigation={navigation} setCollectionMaker={setCollectionMaker} collectionMaker={collectionMaker} />

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

      <ModalMenu
        isVisible={collectionMaker}
        onBackdropPress={() => setCollectionMaker(false)}
        onBackButtonPress={() => setCollectionMaker(false)}
        transparent={true}
        onSwipeComplete={() => setCollectionMaker(false)}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        swipeDirection='down'
        hideModalContentWhileAnimating
        propagateSwipe
        swipeThreshold={50}
        useNativeDriverForBackdrop
        style={{margin: 0, position: 'absolute', right: 0, left: 0, bottom: -windowHeight*0.35, alignItems: 'center'}}
      >       
        <View
          style={{
            backgroundColor: "#121212",
            width: '100%',
            height: windowHeight*0.75,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View style={{alignItems: 'center'}}>
            <View style={{backgroundColor: '#4a4a4a', width: 100, height: 5, marginTop: 10}}></View>
          </View>
          <CollectionMaker setCollectionMaker={setCollectionMaker} />
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
