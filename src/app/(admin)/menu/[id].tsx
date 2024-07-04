import { StyleSheet, Text, View,Image,Pressable} from 'react-native'
import {useState} from 'react'
import { Stack, useLocalSearchParams, useRouter,Link} from 'expo-router'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const router=useRouter();



const ProductDetailScreen = () => {
 
  const {id}=useLocalSearchParams();
  const {addItem}=useCart();
    const product=products.find((p)=>p.id.toString()==id)




  if (!product){
    return <Text>not found</Text>
  }
  return (
    <View>
      
      <Stack.Screen
       options={{
        title:"Menu",
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
      <Image source={{uri:product.image || defaultPizzaImage}}
                      style={styles.image}/>
             

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    padding:10

  },
  title:{
    fontSize:20,
    fontWeight:"bold"
  },
  image:{
    width:"100%",
    aspectRatio:1,
  },
  price:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:"auto"
  },
  
})