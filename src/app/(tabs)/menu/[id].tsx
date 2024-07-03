import { StyleSheet, Text, View,Image,Pressable} from 'react-native'
import {useState} from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'

const router=useRouter();

const sizes:PizzaSize[]=['S','M','L','XL']

const ProductDetailScreen = () => {
  const[selectedSize,setSelectedSize]=useState<PizzaSize>("M");
  const {id}=useLocalSearchParams();
  const {addItem}=useCart();
    const product=products.find((p)=>p.id.toString()==id)

const addTocart=()=>{
  if(!product)
    {
      return

    }
  addItem(product,selectedSize);
  router.push('/cart')

}


  if (!product){
    return <Text>not found</Text>
  }
  return (
    <View>
      <Stack.Screen options={{title:product.name}}/>
      <Image source={{uri:product.image || defaultPizzaImage}}
                      style={styles.image}/>
                        <Text>Select size</Text>

<View style={styles.sizes}>   
{sizes.map((size)=>(
  <Pressable key={size}
   style={[styles.size,{backgroundColor:selectedSize==size?"gainsboro":"white"}]}
   onPress={()=>{setSelectedSize(size)}}
   >
  
  <Text style={styles.Sizetext} key={size}>{size}</Text>
  </Pressable>  
))}
</View>  
      <Text style={styles.price}>{product.price}</Text>
      <Button text="Add to cart " onPress={addTocart}/>
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
  image:{
    width:"100%",
    aspectRatio:1,
  },
  price:{
    fontSize:18,
    fontWeight:"bold",
    marginTop:"auto"
  },
  sizes:{
    flexDirection:'row',
    justifyContent:'space-around',


  },
  size:{
    backgroundColor:'gainsboro',
    width:50,
    aspectRatio:1,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center"

  },
  Sizetext:{
    fontSize:20,
    fontWeight:'500',
  }
})