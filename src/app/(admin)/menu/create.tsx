import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';


const CreateProductScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState('');

  const {id:idString}=useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]??'');
  const isUpdate=!!id
  const router=useRouter();

  const {mutate:insertProduct}=useInsertProduct();
  const {mutate:deleteProduct}=useDeleteProduct();
 
  const {mutate:updateProduct}=useUpdateProduct();
  const {data:updatingProduct}=useProduct(id);


  useEffect(()=>{
    if(updatingProduct){
      setPrice(updatingProduct.price.toString());
      setName(updatingProduct.name)
      setImage(updatingProduct.image || defaultPizzaImage)
      
    }
  },[updatingProduct])

  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetField = () => {
    setName('');
    setPrice('');
    setImage(null);
    setErrors('');
  };

  const validateInput = () => {
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price must be a number');
      return false;
    }
    setErrors('');
    return true;
  };
const onSubmit=()=>{
  if(isUpdate){
    onUpdate();

  }
  else{
    onCreate();
  }
}
const onUpdate = () => {
  if (!validateInput()) {
    return;
  }

  console.warn('Product updated successfully');

  updateProduct(
    {
      id,                      // Pass the product ID
      name,
      price: parseFloat(price), // Convert price to a float
      image
    },
    {
      onSuccess: () => {
        resetField();
        router.back();
      },
      onError: (error) => {
        Alert.alert('Error', `Failed to update product: ${error.message}`);
      },
    }
  );
};
const onDelete=()=>{
  deleteProduct(id,{
    onSuccess: () => {
      resetField();
      router.replace('/(admin)');
    },
    onError:()=>{
      Alert.alert(errors)
    }
  })

}

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
   
    insertProduct({name,price:parseFloat(price),image},{
      onSuccess:()=>{
        resetField();
        router.back()
      },
    })


  };



  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:isUpdate ? "Update":"Create Product"}}  />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdate?"Update":"Create"}/>
     {isUpdate && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 5,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
