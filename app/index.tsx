import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getWeatherIcon } from "@/constants/WeatherIcons";

type Condition = {
  text: string;
  code: number;
}

type ForcastDay = {
  date: string;
  day: {
    maxtemp_c: number,
    mintemp_c: number
    condition: Condition
  }
}

type Weather = {
  location: {
    name: string;
    county: string;
    localTime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    is_day: number;
    uv: number;
    condition: Condition;
  };
  forecast: {
    forecastday: ForcastDay[];
  }
};

type WeatherIcon =
  | "weather-sunny"
  | "weather-partly-cloudy"
  | "cloud-outline"
  | "weather-cloudy-alert"
  | "weather-sunny-off";

  const ForcastDayItem = ({forcastday} : {forcastday: ForcastDay}) => {
    return (
      <View style={styles.flatList}>
      <Text style={styles.flatListItem}>{forcastday?.date}</Text>
      <MaterialCommunityIcons 
          name={getWeatherIcon(forcastday?.day?.condition?.code) as WeatherIcon}
          size={20} 
          color="white" />
      <Text style={styles.flatListItem}>max° {forcastday?.day?.maxtemp_c}</Text>
      <Text style={styles.flatListItem}>min° {forcastday?.day?.mintemp_c}</Text>
      </View>
    )
  }

const Index = () => {
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState<boolean>();

  const requestWeather = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://api.weatherapi.com/v1/forecast");
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    requestWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : <></>}
      <View style={styles.currentTempContainer}>
        <Text style={styles.currentTemp}>{weather?.current?.temp_c}°</Text>
        <View style={{ gap: 8 }}>
          <Text style={styles.condition}>
            {weather?.current?.condition?.text}
          </Text>
          <Text style={styles.condition}>Índice UV: {weather?.current?.uv}</Text>
        </View>
        <MaterialCommunityIcons 
          name={getWeatherIcon(weather?.current?.condition?.code) as WeatherIcon}
          size={56} 
          color="white" />
      </View>
      <FlatList
      data={weather?.forecast?.forecastday}
      keyExtractor={item => item.date}
      renderItem={({ item }) => <ForcastDayItem forcastday={item}/>}
      />
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkblue",
    flex: 1,
    padding: 24,
  },
  condition: {
    fontSize: 20,
    color: "#ffff",
  },
  currentTempContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  currentTemp: {
    fontSize: 64,
    color: "#ffff",
  },
  flatList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "flex-end",
    gap: 20,
  },
  flatListItem: {
    fontSize: 18,
    color: "#ffff"
  }
});
export default Index;
