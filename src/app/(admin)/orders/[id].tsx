import { useLocalSearchParams,Stack } from "expo-router";
import { Pressable, Text ,View} from "react-native";
import orders from "@assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderList";
import { FlatList } from 'react-native'
import { OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id);
  
    if (!order) {
      return <Text>Not found</Text>;
    }
  
    return (
      <View style={{ padding: 10 }}>
        <Stack.Screen options={{ title: `Order #${id}` }} />
  
        <FlatList
          data={order.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={() => <OrderListItem order={order} />}
          ListFooterComponent={
            <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          }
        />
      </View>
    );
  }
  