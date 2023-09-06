import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from "react-native";
import { Dimensions } from "react-native";
import InputField from "../helperComponents/InputField";
import { authService } from "../services/allServices";
import { authContext } from '../utils/auth-Context';
import * as SecureStore from 'expo-secure-store'

const windowHeight = Dimensions.get("window").height;
const LoginScreen = () => {
  const [authState, setAuthState] = useState("login");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [warning, setWarning] = useState({
    password: false,
    confirmPassword: false,
    email: false,
    submission: false,
    submissionMessage: "",
    login: false,
    loginMessage: "",
  });
  const [profile, setProfile] = useState({
    name: "",
    emailorusername: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {userData, setUserData} = useContext(authContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onLogin = async () => {
    if(!profile.emailorusername || !profile.password){
      setWarning({...warning, login: true, loginMessage: 'Please include all fields'})
      return
    }
    setWarning({...warning, login: false})
    await authService
      .loginUser({
        emailorusername: profile.emailorusername,
        password: profile.password,
      })
      .then(async(res) => {
        setUserData(res.data);
        await SecureStore.setItemAsync('user_token', res.data.token)
      })
      .catch((err) => {
        setWarning({
          ...warning,
          login: true,
          loginMessage: err.response.data.message,
        });
        console.log(err.response.data.message);
      });
  };

  const onSignUp = async () => {
    if (warning.password || warning.confirmPassword || warning.email) {
      return;
    }
    if(!profile.name || !profile.email || !profile.password || !profile.username || !profile.confirmPassword){
      setWarning({...warning, submission: true, submissionMessage: 'Please include all fields'})
      return
    }
    setWarning({...warning, submission: false})
    await authService
      .registerUser({
        name: profile.name,
        email: profile.email,
        username: profile.username,
        password: profile.password,
      })
      .then(async(res) => {
        setUserData(res.data)
        await SecureStore.setItemAsync('user_token', res.data.token)
      })
      .catch((err) => {
        setWarning({
          ...warning,
          submission: true,
          submissionMessage: err.response.data.message,
        });
        console.log(err.response.data.message);
      });
  };

  const handleWarning = (e) => {
    if (e == "password" || !e) {
      if (profile.password.length < 8) {
        setWarning({ ...warning, password: true });
      } else {
        setWarning({ ...warning, password: false });
      }
    }
    if (e == "confirmPassword" || !e) {
      if (profile.password != profile.confirmPassword && !warning.password) {
        setWarning({ ...warning, confirmPassword: true });
      } else {
        setWarning({ ...warning, confirmPassword: false });
      }
    }
  };

  const emailValidate = () => {
    if(!profile.email){
      return
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(profile.email) === false) {
      setWarning({ ...warning, email: true });
    } else {
      setWarning({ ...warning, email: false });
    }
  };

  return (
    <SafeAreaView
      style={{
        height: windowHeight-StatusBar.currentHeight,
        backgroundColor: "#121212",
        // paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 16,
        // justifyContent: isKeyboardVisible ? "flex-start" : "",
        marginTop: isKeyboardVisible ? StatusBar.currentHeight : 0
      }}
    >
      <View
        style={{
          backgroundColor: "#E6DFE6",
          padding: 8,
          height: windowHeight * 0.6,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          zIndex: 3,
          position: 'relative',
          top: isKeyboardVisible ? 5 : windowHeight*0.2
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 24,
            marginTop: 8
          }}
        >
          <Pressable
            style={{
              width: "40%",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 15,
              borderColor: authState == "login" ? "#C261CF" : "#1f1f1f",
            }}
            onPress={() => setAuthState("login")}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 2,
                color: authState == "login" ? "#C261CF" : "#1f1f1f",
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: "40%",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 15,
              borderColor: authState == "signup" ? "#C261CF" : "#1f1f1f",
            }}
            onPress={() => setAuthState("signup")}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: authState == "signup" ? "#C261CF" : "#1f1f1f",
              }}
            >
              SignUp
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          {authState == "login" ? (
            <>
              <InputField
                label="Email or Username"
                keyboardType="email-address"
                inputType="email"
                onChangeText={(e) =>
                  setProfile({ ...profile, emailorusername: e })
                }
                maxLength={100}
              />
              <InputField
                label="password"
                keyboardType="default"
                inputType="password"
                onChangeText={(e) => setProfile({ ...profile, password: e })}
                maxLength={50}
                fieldButtonLabel='Forgot?'
              />
              <Text
                style={{
                  marginTop: -20,
                  fontSize: 12,
                  color: "#dc3545",
                  display: warning.login ? "flex" : "none",
                }}
              >
                {warning.loginMessage}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#C261CF",
                  width: "30%",
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginBottom: 8,
                  marginTop: 10,
                }}
                onPress={onLogin}
              >
                <Text style={{ color: "#fff" }}>Login</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1f1f1f" }}>
                  Don't have an account ?{" "}
                </Text>
                <Text
                  style={{ color: "#0000ee" }}
                  onPress={() => setAuthState("signup")}
                >
                  SignUp
                </Text>
              </View>
            </>
          ) : (
            <>
              <InputField
                label="Full Name"
                keyboardType="default"
                inputType="text"
                onChangeText={(e) => setProfile({ ...profile, name: e })}
                maxLength={50}
              />
              <InputField
                label="Email"
                keyboardType="email-address"
                inputType="email"
                onChangeText={(e) => setProfile({ ...profile, email: e })}
                maxLength={100}
                onEndEditing={emailValidate}
              />
              <Text
                style={{
                  marginTop: -20,
                  fontSize: 12,
                  color: "#dc3545",
                  display: warning.email ? "flex" : "none",
                }}
              >
                Email format is incorrect
              </Text>
              <InputField
                label="password"
                keyboardType="default"
                inputType="password"
                onChangeText={(e) => setProfile({ ...profile, password: e })}
                maxLength={50}
                onEndEditing={() => handleWarning("password")}
              />
              <Text
                style={{
                  marginTop: -20,
                  fontSize: 12,
                  color: "#dc3545",
                  display: warning.password ? "flex" : "none",
                }}
              >
                Minimum 8 characters
              </Text>
              <InputField
                label="Confirm password"
                keyboardType="default"
                inputType="password"
                onChangeText={(e) =>
                  setProfile({ ...profile, confirmPassword: e })
                }
                maxLength={50}
                onEndEditing={() => handleWarning("confirmPassword")}
              />
              <Text
                style={{
                  marginTop: -20,
                  fontSize: 12,
                  color: "#dc3545",
                  display: warning.confirmPassword ? "flex" : "none",
                }}
              >
                Passwords do not match
              </Text>
              <InputField
                label="username"
                keyboardType="default"
                inputType="text"
                onChangeText={(e) => setProfile({ ...profile, username: e })}
                maxLength={30}
              />
              <Text
                style={{
                  marginTop: -20,
                  fontSize: 12,
                  color: "#dc3545",
                  display: warning.submission ? "flex" : "none",
                }}
              >
                {warning.submissionMessage}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#C261CF",
                  width: "30%",
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginBottom: 8,
                  marginTop: 10,
                }}
                onPress={onSignUp}
              >
                <Text style={{ color: "#fff" }}>SignUp</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#1f1f1f" }}>
                  Already have an account ?{" "}
                </Text>
                <Text
                  style={{ color: "#0000ee" }}
                  onPress={() => setAuthState("login")}
                >
                  Login
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#E6DFE6",
          height: windowHeight * 0.6,
          zIndex: 2,
          width: "100%",
          right: 12,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          top: isKeyboardVisible ? 9 : windowHeight*0.205
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#E6DFE6",
          height: windowHeight * 0.6,
          zIndex: 1,
          width: "100%",
          right: 8,
          borderRadius: 5,
          borderColor: "#daa0e2",
          borderWidth: 1,
          top: isKeyboardVisible ? 13 : windowHeight*0.21
        }}
      ></View>  
    </SafeAreaView>
  );
};

export default LoginScreen;
