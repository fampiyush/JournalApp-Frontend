import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { authService } from "../services/allServices";
import { authContext } from '../utils/auth-Context';
import { FontAwesome } from '@expo/vector-icons';

const SideMenu = () => {

    const {imgURI, userData} = useContext(authContext);

    return (
    <View style={{marginTop: 20}}>
        {
            imgURI ?
                <Image source={{uri: imgURI}} height={75} width={75} style={{borderRadius: 50, marginLeft: 16}} />
            :
                <FontAwesome name="user-circle" size={75} color="#73849e" />
        }
        <View style={{marginTop: 8, marginLeft: 16}}>
            <Text style={{color: '#E6DFE6', fontSize: 16}}>{userData.name}</Text>
            <Text style={{color: '#C261CF', fontSize: 12}}>@{userData.username}</Text>
        </View>
        <View style={{width: '100%', backgroundColor: '#daa0e2', height: 1, marginTop: 16}}></View>
        <View style={{marginTop: 16}}>
            <Pressable style={({pressed}) =>[{paddingVertical: 5, backgroundColor: pressed ? '#4a4a4a' : '#121212'}]}>
                <Text style={{color: '#E6DFE6', fontSize: 22,letterSpacing: 1, marginLeft: 16}}>Profile</Text>
            </Pressable>
            <Pressable style={({pressed}) =>[{marginTop: 16,paddingVertical: 5, backgroundColor: pressed ? '#4a4a4a' : '#121212'}]}>
                <Text style={{color: '#E6DFE6', fontSize: 22,letterSpacing: 1, marginLeft: 16}}>Settings</Text>
            </Pressable>   
            <Pressable style={({pressed}) =>[{marginTop: 16,paddingVertical: 5, backgroundColor: pressed ? '#4a4a4a' : '#121212'}]}>
                <Text style={{color: '#E6DFE6', fontSize: 22,letterSpacing: 1, marginLeft: 16}}>Feedbacks</Text>
            </Pressable>   
        </View>
    </View>
  )
}

export default SideMenu