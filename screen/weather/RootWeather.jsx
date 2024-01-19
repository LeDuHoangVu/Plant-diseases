import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeWeather from './HomeWeather';

// import rating from './rating';
const Stack = createStackNavigator();


const RootWeather = () => {
    return (
           <Stack.Navigator>
                <Stack.Screen 
                    options={{headerShown: false}}
                    name="HomeWeather" 
                    component={HomeWeather} />
                 
            
            </Stack.Navigator>
    );
}

export default RootWeather;