import { Text, FlatList, ActivityIndicator } from 'react-native';
import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderList';
export default function OrdersScreen() {
 


  return (
   <FlatList 
   data={orders} 
   renderItem={({item})=><OrderListItem order={item}/>}
   />
  );
}