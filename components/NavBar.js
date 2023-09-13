import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { Dimensions } from 'react-native'
import {useRoute} from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height
function NavBar({setMenuStatus}) {

  const route = useRoute()

  return (
    <View style={styles.wrap}>
    <View style={styles.container}>
        <View style={styles.barsMenu}>
          <View style={{paddingHorizontal: 8}}>
            <Icon name='bars' color='#E6DFE6' size={22} onPress={() => setMenuStatus(true)} />
          </View>
          <Text style={styles.headText}>{route.params.component == 'Collection' ? 'Collection' : 'Shared'}</Text>
        </View>
        <Icon name='search' color='#E6DFE6' size={22} />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrap: {
      alignItems: 'center'
    },
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: windowHeight*0.05,
        width: '95%',
        backgroundColor: '#1f1f1f',
        borderRadius: 15,
    },
    barsMenu: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headText: {
        fontSize: 22,
        marginLeft: 4,
        fontWeight: '600',
        color: '#E6DFE6'
    }
})

export default NavBar