import { Image, Text, View ,StyleSheet, Button,StatusBar, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react'

const DiseasesDetail = (props) => {
  const item = props.route.params.item
  console.log("detail",props.route.params.item);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vheader}>
        <Image style={styles.img} source={{ uri: item.image_url }} />
        </View>
        <View style={styles.vtree}>
        <Text style={styles.txttree}>{item.cate}</Text>
        <Text style={styles.txtdise}>{item.disease_name}</Text>

        </View>
        <View style={styles.body}>
        <Text style={styles.txtDt}>Chi tiết bệnh</Text>
        <Text style={styles.txtdics}>{item.description}
        </Text>
        </View>
        <View style={styles.body2}>
        <Text style={styles.txtDt}>Cách điều trị</Text>
        <Text style={styles.txtdics}>{item.Possible_steps}
        </Text>
        </View>
        
   
      </View>
   
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  vheader:{
    width:'100%',
    // height:'100%',
  },
  vimg:{
    width:'100%',
    height:200,
    
  },
  img:{
    width:'100%',
    height:200,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  vtree:{
    position: 'absolute',
    backgroundColor:"white",
    width: "80%",
    height: 80,
    left:"10%",
    top: 150,
    borderRadius:10,
    alignItems: 'center',
    padding:10,

  },
  body:{
    width:"100%",
    padding:10,
    marginTop:40,
    backgroundColor:"white",
    justifyContent: 'center',
  },
  body2:{
    width:"100%",
    padding:10,
    marginTop:20,
    backgroundColor:"white",
    justifyContent: 'center',
  },
  txttree:{
    fontSize:25,
    textAlign: 'center',
    fontWeight:'bold',
  },
  txtdise:{
    fontSize:22,
    textAlign: 'center',
    fontStyle:"italic"
  },
  txtDt:{
    fontSize: 30,
    fontWeight:"500",
    marginBottom:10,
    
  },
  txtdics:{
    fontSize:16,
    paddingRight: 10,
  },
});
export default DiseasesDetail