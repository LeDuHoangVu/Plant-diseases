import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from 'react';
import { Image, Text, View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
// import { Rating } from 'react-native-elements';
// import { Rating } from 'react-native-ratings';
import callApi from '../../config/api';

const Detection = (props) => {
  const navigation = props.navigation;
  const [image, setImage] = useState(null);

  const clearImage = () =>{
    setImage(null);
  }
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    // Explore the result
    console.log(result);

    if (!result.canceled) {
      setImage(result?.assets?.[0]?.uri);
      console.log(result?.assets?.[0]?.uri);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result?.assets?.[0]?.uri);
      console.log(result?.assets?.[0]?.uri);
    }
  };


  const predict = async (image) => {
    try {
      const formData = new FormData();

      formData.append("image", {
      uri: Platform.OS === "android" ? image : image.replace("file://", ""),
      name: "image.jpg",
      type: "image/jpeg",
    });
      const response = await callApi.post("/submit", 
      data = formData, 
      {
        headers: {
        "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        }
      });
  
      // Handle the response as needed
      item = response.data
      navigation.navigate("Result",{item})
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

    return (
<View style={{ flex: 1, justifyContent: 'flex-end', alignItems:"center" }}>
  <View style={styles.viewimg}>
  {image ? (<>
    <Image
      source={{ uri: image }}
      style={{ flex: 1, width: null, height: null }}
      resizeMode="contain"
      />
      <View style={styles.btnDelete}>
       <Icon
      name='remove'
      type='font-awesome'
      color='#f50'
      size={20}
      raised
      onPress={clearImage}
      />
      </View>
      </>
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 24,
              color: "#146C94",
            }}
          >
            Image View
          </Text>
        )}
  </View>
  <TouchableOpacity style={styles.btnPredict} onPress={()=>{predict(image)}}>
    <Text style={styles.txtdete} > DỰ ĐOÁN</Text>
  </TouchableOpacity>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:100, paddingBottom:10 }}>
    <Icon
      name='camera'
      type='font-awesome'
      color='#f50'
      size={36}
      raised
      onPress={openCamera}
    />
    <Icon
      name='photo'
      type='font-awesome'
      color='#f50'
      size={36}
      raised
      onPress={pickImage}
    />
  </View>
</View>

    );
}
const styles = StyleSheet.create({
  viewimg:{
      width: "90%",
      height: 500,
      backgroundColor:"white",
      marginBottom:20,
      borderRadius:10,
      borderWidth:2,
      borderStyle:"dashed",
      borderColor:"green"
 
  },
  txtdete:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  btnPredict:{
    borderRadius:10,
    width:"90%",
    height:50,
    backgroundColor:"green",
    marginBottom:20,
  },
  btnDelete:{
    position:"absolute",
    top:0,
    right:10,
  }
  });
  
export default Detection;