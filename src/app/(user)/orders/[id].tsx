import React from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import { useOrderDetails } from '@/api/orders';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '') ?? 0;

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error)
    return <Text>Failed to fetch</Text>;
  }
  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
