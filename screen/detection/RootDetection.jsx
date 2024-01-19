import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Detection from './Detection';
import DiseasesDetail from '../home/DiseasesDetail';
const Stack = createStackNavigator();


const RootDetection = () => {
    return (
           <Stack.Navigator>
                <Stack.Screen 
                    options={{headerShown: false}}
                    name="Detection" 
                    component={Detection} />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="Result" 
                    component={DiseasesDetail} /> 
            
            </Stack.Navigator>
    );
}

export default RootDetection;