import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Diseases from './Diseases';
import DiseasesDetail from './DiseasesDetail';
// import rating from './rating';
const Stack = createStackNavigator();


const RootHome = () => {
    return (
           <Stack.Navigator>
                <Stack.Screen 
                    options={{headerShown: false}}
                    name="Home" 
                    component={Home} />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="Diseases" 
                    component={Diseases} />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="DiseasesDetail" 
                    component={DiseasesDetail} />    
            
            </Stack.Navigator>
    );
}

export default RootHome;