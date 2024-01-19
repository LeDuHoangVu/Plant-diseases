import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { debounce } from "lodash";
// import { theme } from '../theme';
import { fetchLocations, fetchWeatherForecast } from '../../config/weatherapi';;
import * as Progress from 'react-native-progress';
import { StatusBar } from 'expo-status-bar';
import { weatherImages } from '../../constants';
import { getData, storeData } from '../../utils/asyncStorage';

export default function HomeWeather() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({})
  const theme = {
    bgWhite: opacity => `rgba(255,255,255, ${opacity})`
  }   

  const handleSearch = search=>{
    // console.log('value: ',search);
    if(search && search.length>2)
      fetchLocations({cityName: search}).then(data=>{
        // console.log('got locations: ',data);
        setLocations(data);
        console.log("123",data);
      })
  }

  const handleLocation = loc => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc?.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc?.name);
    })
  }

  useEffect(()=>{
    fetchMyWeatherData();
  },[]);

  const fetchMyWeatherData = async ()=>{
    let myCity = await getData('city');
    let cityName = 'Hoi An';
    if(myCity){
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data=>{
      console.log('got data: ',data?.forecast?.forecastday);
      setWeather(data);
      setLoading(false);
    })
    
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  return (
 
    <ScrollView style={{ flex: 1, position: 'relative' }}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../../assets/images/bg.png')}
        style={{ position: 'absolute', width: '100%', height: "100%" }}
      />
      {
        loading ? (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1, height:780}}>
            {/* search section */}
            <View style={{ height: '7%', marginHorizontal: 4, position: 'relative', zIndex: 50 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: showSearch ? 999 : 0,
                  backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                }}>
                {
                  showSearch ? (
                    <TextInput
                      onChangeText={handleTextDebounce}
                      placeholder="Search city"
                      placeholderTextColor={'lightgray'}
                      style={{ paddingLeft: 6, height: 30, paddingBottom: 1, flex: 1, color: 'white' }}
                    />
                  ) : null
                }
                <TouchableOpacity
                  onPress={() => toggleSearch(!showSearch)}
                  style={{ borderRadius: 999, padding: 3, margin: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                  {
                    showSearch ? (
                      <XMarkIcon size={25} color="white" />
                    ) : (
                      <MagnifyingGlassIcon size={25} color="white" />
                    )
                  }

                </TouchableOpacity>
              </View>
              {
                locations.length > 0 && showSearch ? (
                  <View style={{ position: 'absolute', width: '100%', backgroundColor: 'gray', top: 16, borderRadius: 20 }}>
                    {
                      locations.map((loc, index) => {
                        let showBorder = index + 1 !== locations.length;
                        let borderStyle = showBorder ? { borderBottomWidth: 2, borderBottomColor: 'gray' } : {};
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleLocation(loc)}
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 3, paddingHorizontal: 4, marginBottom: 1, ...borderStyle }}>
                            <MapPinIcon size={20} color="gray" />
                            <Text style={{ color: 'black', fontSize: 16, marginLeft: 2 }}>{loc?.name}, {loc?.country}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                ) : null
              }

            </View>

            {/* forecast section */}
            <View style={{ marginHorizontal: 4, justifyContent: 'space-around', flex: 1, marginBottom: 2 }}>
              {/* location */}
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                {location?.name},
                <Text style={{ fontSize: 24, fontWeight: '600', color: 'gray' }}>{location?.country}</Text>
              </Text>
              {/* weather icon */}
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  source={weatherImages[current?.condition?.text || 'other']}
                  style={{ width: 80, height: 80 }}
                />

              </View>
              {/* degree celcius */}
              <View style={{ justifyContent: 'space-y-2' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 80, marginLeft: 5 }}>
                  {current?.temp_c}&#176;
                </Text>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, letterSpacing: 1 }}>
                  {current?.condition?.text}
                </Text>
              </View>

              {/* other stats */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 4 }}>
                <View style={{ flexDirection: 'row', marginRight: 2, alignItems: 'center' }}>
                  <Image source={require('../../assets/icons/wind.png')} style={{ width:16, height:16 }} />
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>{current?.wind_kph}km</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 2, alignItems: 'center' }}>
                  <Image source={require('../../assets/icons/drop.png')} style={{ width:16, height:16 }} />
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>{current?.humidity}%</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/icons/sun.png')} style={{ width:16, height:16 }} />
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>

              </View>
            </View>

            {/* forecast for next days */}
            <View style={{ marginBottom: 2, marginVertical: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginBottom: 2 }}>
                <CalendarDaysIcon size={22} color="white" />
                <Text style={{ color: 'white', fontSize: 16 }}>Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {
                  weather?.forecast?.forecastday?.map((item, index) => {
                    const date = new Date(item.date);
                    const options = { weekday: 'long' };
                    let dayName = date.toLocaleDateString('en-US', options);
                    dayName = dayName.split(',')[0];

                    return (
                      <View
                        key={index}
                        style={{ justifyContent: 'center', alignItems: 'center', width: 90, borderRadius: 20, paddingVertical: 3, marginRight: 4, backgroundColor: 'rgba(255, 255, 255,0.15)' }}>
                        <Image
                          source={weatherImages[item?.day?.condition?.text || 'other']}
                          style={{ width: 24, height: 24 }}
                        />
                        <Text style={{ color: 'white' }}>{dayName}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                          {item?.day?.avgtemp_c}&#176;
                        </Text>
                      </View>
                    );
                  })
                }

              </ScrollView>
            </View>


          </SafeAreaView>
        )
      }

    </ScrollView>
  )
}
