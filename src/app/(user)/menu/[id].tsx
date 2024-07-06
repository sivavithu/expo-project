import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { defaultPizzaImage } from '@/components/ProductListItem';
import Button from '@/components/button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';

const router = useRouter();

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { id: idString } = useLocalSearchParams();
  const { addItem } = useCart();

  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '') ;
  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' },
            ]}
            onPress={() => {
              setSelectedSize(size);
            }}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>{product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
