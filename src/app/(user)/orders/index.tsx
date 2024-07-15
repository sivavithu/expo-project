import { Text, FlatList, ActivityIndicator } from 'react-native';

import OrderListItem from '@/components/OrderListItem';
import { useMyorderList } from '@/api/orders';
export default function OrdersScreen() {
 

  const {data:orders,isLoading,error}=useMyorderList();
if (isLoading) {
  return <ActivityIndicator />;
}

if (error) {
  return <Text>Failed to fetch products</Text>;
}


  return (
   <FlatList 
   data={orders} 
   renderItem={({item})=><OrderListItem order={item}/>}
   />
  );
}