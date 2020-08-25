import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: "bfcfaae84810f423885b3cf28f9e31ff",
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return (
      <View style={styles.container}>
        <Text>Você precisa habilitar a localização no browser o/</Text>
      </View>
    );
  } else if (weather == false) {
    return (
      <View style={styles.container}>
        <Text>Carregando o clima...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text>
          Clima nas suas Coordenadas ({weather["weather"][0]["description"]})
        </Text>
        <Text>Temperatura atual: {weather["main"]["temp"]}°</Text>
        <Text>Temperatura máxima: {weather["main"]["temp_max"]}°</Text>
        <Text>Temperatura minima: {weather["main"]["temp_min"]}°</Text>
        <Text>Pressão: {weather["main"]["pressure"]} hpa</Text>
        <Text>Humidade: {weather["main"]["humidity"]}%</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    marginLeft: 20,
  },
});
