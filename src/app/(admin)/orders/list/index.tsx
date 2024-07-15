import { Text, FlatList, ActivityIndicator } from 'react-native';

import OrderListItem from '@/components/OrderListItem';
import { useAdminorderList } from '@/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useOrderListener } from '@/api/subscriptions/subscriptions';
export default function OrdersScreen() {
 useOrderListener();
 
const {data:orders,isLoading,error}=useAdminorderList({archived:false});
if (isLoading) {
  return <ActivityIndicator />;
}

if (error) {
  return <Text>Failed to fetch products</Text>;
}


  return (
    <FlatList
    data={orders}
    renderItem={({ item }) => <OrderListItem order={item} />}
    contentContainerStyle={{ gap: 10, padding: 10 }}
  />
  );
}