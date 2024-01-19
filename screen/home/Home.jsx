
import React, { useEffect, useState } from 'react';
import { Image, Text, View ,StyleSheet, Button,StatusBar, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from "react-native-elements";
// import { Rating } from 'react-native-elements';
// import { Rating } from 'react-native-ratings';
// import callApi from '../../api/axios';
import callApi from '../../config/api';
import { useNavigation } from '@react-navigation/native';

const Home = (props) => {

const [search, setSearch] = useState("");
const navigation = useNavigation();
const handlePress = async (cate) => {
  try {
    const response = await callApi.get('/cate?name='+cate);
    const cateData = response.data;
    // setData(data);
    console.log("sada",cateData);
    navigation.navigate('Diseases',{data:cateData});
  } catch (error) {
    console.error(error);
    // setData([]);
  }
  // console.log(cate);
};
const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await callApi.get('/cate');
      const data = response.data;
      setData(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

    return (
      <ScrollView>
        <StatusBar/>
        <View >
        <Image source={require('../../assets/logo.png')} style={styles.logo}  />    
        </View>
          <Text style={styles.text1}>Đến Với Chúng Tôi</Text>
          <ScrollView horizontal>
            
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <View style={styles.viewstarted}>
              <Image source={require('../../assets/OIP.jpg')} style={styles.imagestarted1} />            
            </View>
            <View style={styles.titlebox}>
              <Text style={styles.title}>
                  GIỚI THIỆU VỀ ỨNG DỤNG
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <View style={styles.viewstarted}>
              <Image source={require('../../assets/OIP.jpg')} style={styles.imagestarted1} />            
            </View>
            <View style={styles.titlebox}>
              <Text style={styles.title}>
                  HƯỚNG DẪN CÁCH CHỤP ẢNH
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <View style={styles.viewstarted}>
              <Image source={require('../../assets/OIP.jpg')} style={styles.imagestarted1} />            
            </View>
            <View style={styles.titlebox}>
              <Text style={styles.title}>
                  CÁC LỖI GẶP KHI CHỤP ẢNH
              </Text>
            </View>
          </TouchableOpacity >
          </ScrollView>
          <Text style={styles.text2}> Danh Sách Cây Trồng</Text>
            <View style={{ paddingHorizontal:20, }}>
          <ScrollView style={{ width:"100%" }}>

          {data && data?.map((cate,i)=>{
              return(
          <TouchableOpacity onPress={()=> {handlePress(cate?.cate)}} key={i} >
            <Image source={{ uri: cate?.cate_img }} style={styles.imagelist1}/>
          </TouchableOpacity>

          )})}  
          
   

          </ScrollView>
            </View>
        
     
    
               
      </ScrollView>
    );
}
const styles = StyleSheet.create({

  viewlist:{
    height: 80,
    width: "100%",
    // backgroundColor:"white",
   borderRadius: 10,
  },
  logo:{
    height: 70,
    width: "100%",
  },
  imagelist1:{
    marginBottom:10,
    height: 80,
    width: "100%",
    borderRadius: 10,
    resizeMode:"cover",
  }, 
  viewlist2:{
    height: 80,
    width: "45%",
    marginLeft: 215,
    top: -80,
    backgroundColor:"white",
   borderRadius: 10,
  },
  titlebox:{
    position: 'absolute',
    height: 150,
    width: 300,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    top: 140,
    right: -10,
  },

  text1:{
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft:10,
    marginBottom:15,

  },
  text2:{
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft:10,
    marginBottom:15,
    marginTop:10,

  },
  viewstarted:{
    height: 180,
    width: 300,
   
  },
  imagestarted1:{
    height: 180,
    width: 300,
    borderRadius: 10,
    resizeMode:"cover",
  }, 
   imagestarted2:{
    height: 150,
    width: 300,
    borderRadius: 10,
   
    resizeMode:"cover",
  },

  searchbar:{
    margin: 10,
    borderRadius: 10,
   
  },
    bold:{
        fontWeight: "600",
      textAlign: "center",

    },
    boldG:{
      fontSize:20,
      fontWeight: "600",
      color: "#4e9f65",
      textAlign: "center",
    },
    bottomdiv:{
       textAlign: 'center',
       width: "100%",
    },
    div: {
      width: "45%",
      backgroundColor: "#fff",
      display: "flex",
      flexWrap: "wrap",
      margin:"1.25%",
      borderRadius: 10,
      padding: 2,
      elevation: 3
    },
    divI: {
      width: "100%",
    },
    img: {
      width: "100%",
      height: 170,
      borderRadius: 10,
    },
    itemDs:{
      // width:"auto",
      width: 45,
      position:"absolute",
      zIndex:10,
      right:5,
      top:5,
      backgroundColor: "#ff4d4d",
      borderRadius:50,
      paddingHorizontal:3,
      paddingVertical:1,
      borderWidth:1,
      borderColor:"white",
      borderStyle:"solid"      
    },
    disc:{
      color: "white",
      fontSize:14,
      textAlign: "center",
    },
  });
  
export default Home;