import { Text,FlatList, ActivityIndicator} from 'react-native';

import ProductListItem from '../../../components/ProductListItem'

import products from '../../../../assets/data/products';
import { supabase } from '@/app/lib/supabase';
import { useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { useProductList } from '@/api/products';





export default function MenuScreen() {

  const {data:products,error,isLoading}=useProductList();

 
      if(isLoading){
        return <ActivityIndicator/>
      }
      if(error){
        return <Text>Failed to fetch data</Text>
      }
    
 


// useEffect(()=>{
//   const fetchProduct=async()=>{
//     const {data,error}=await supabase.from('products').select('*')
//  console.log(error)
//   }
//   fetchProduct();
// },[])


  return (

   <FlatList  
   data={products}
   renderItem={({item})=><ProductListItem product={item}/>}
   numColumns={2}
   contentContainerStyle={{gap:10,padding:20}}
   columnWrapperStyle={{gap:10}}
  
   />
 
  );
}

