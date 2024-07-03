import { View ,Platform,Text} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useCart } from '@/providers/CartProvider'
import { FlatList } from 'react-native'
import CartListItem from '@/components/CartListItem';
import Button from '@/components/button'


export default function cart() {

    const {items,total}=useCart();
  return (
    <View>
     <FlatList data={items} 
     renderItem={({item})=><CartListItem cartItem={item}/>}
     contentContainerStyle={{padding:10,gap:10}}
     />
     <Text style={{marginTop:20,fontSize:20}}>total:${total}</Text>
     <Button text="checkout"/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />    
      </View>
  )
}