import { Image, Text, View ,StyleSheet, Button,StatusBar, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Diseases = (props) => {
    const data = props.route.params?.data
    const navigation = useNavigation();
    const handlePress = (item) => {
      navigation.navigate('DiseasesDetail',{item});
    };
    console.log(data);

  return (
    <ScrollView>
        <View style={{ width :'100%', height:50, marginBottom: 10 }}></View>
        {data && data?.map((item,i)=>{
            return(
            <TouchableHighlight key={i} style={styles.buttondiv} onPress={()=>{handlePress(item)}}  >
            <View  >
            <View style ={styles.vimg}>
            <Image style = {styles.img} source={{ uri : item?.image_url }}/>
            </View>

            <View style={styles.vtext} >
            <Text style={styles.text1}>{item?.cate}</Text>
            </View>
            <View style={styles.vtext2}>
            <Text style={styles.text2}>{item?.disease_name }</Text>
            </View>
            <View style={styles.line}>

            </View>

            </View>
            </TouchableHighlight>
            )
        })}
    
      
    </ScrollView>
  )
}
const styles = StyleSheet.create({
buttondiv:{
    width:'100%',
    height : 100,
    //  backgroundColor : "red",
    display: "flex",
    // paddingTop:10
},
vimg:{
    width: 80,
    height: 80,
    backgroundColor :"white",
    top : 10,
    left : 8,
    borderRadius: 15,
},
img:{
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 15,
},
vtext:{
    height: 30,
    width: 100,
    position:"absolute",
    zIndex:10,
    left:100,
    top:25,
    // backgroundColor: "white",
},
text1:{
    color: "black",
    fontSize:25,
    // textAlign: "center",
    fontWeight:'bold',
},
vtext2:{
    height: 30,
    width: 200,
    position:"absolute",
    zIndex:10,
    left:105,
    top:55,
    // backgroundColor: "white",
},
text2:{
    color: "#878787",
    fontSize:17,
    // textAlign: "center",
    fontStyle:'italic'
},
line: {
    width:'100%',
    left:100,
    top:14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#878787',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
});
export default Diseases;