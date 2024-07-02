import { View, Text ,Platform} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function cart() {
  return (
    <View>
      <Text>cart</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />    
      </View>
  )
}