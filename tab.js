import React from "react";
// import PropTypes from "prop-types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
// import Cart from "./screens/cart/Cart";
// import RootProduct from "./screens/product/RootProduct";
// import RootAuth from "./screens/login/RootAuth";
import RootHome from "./screen/home/RootHome";
import RootDetection from "./screen/detection/RootDetection";
import RootWeather from "./screen/weather/RootWeather";
const Tab = createBottomTabNavigator();
function TabNav(props) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {

        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
          
        } else if (route.name === 'RootDetect') {
          iconName = focused 
          ? 'camera-enhance-outline' 
          : 'camera-enhance';
        }else{
          iconName = focused 
          ? 'earth' 
          : 'earth';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={30} color={color} type="material-community" />;
      },
    })}

      tabBarOptions={{
        activeTintColor: "#4e9f65",
        inactiveTintColor: "#ddd",
        style:{
          // width:"100%",
          paddingTop:7
        }
      }}
    >
     
      <Tab.Screen
        name="Home"
        component={RootHome}
        options={{
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "",
          headerShown: false,
          
        }}
        name="RootDetect"
        component={RootDetection}
      />
       <Tab.Screen
        options={{
          tabBarLabel: "",
          headerShown: false,
        
        }}
        name="Weather"
        component={RootWeather}
      />
    </Tab.Navigator>
  );
}

// TabNav.propTypes = {};

export default TabNav;