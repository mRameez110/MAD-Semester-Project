import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import GenreCard from "../components/GenreCard";
import ItemSeparator from "../components/ItemSeparator";
import MovieCard from "../components/MovieCard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
    TMDB_BASE_URL,
    TMDB_API_KEY,
    TMDB_IMAGE_BASE_URL,
    ENDPOINTS,
    YOUTUBE_BASE_URL,
  } from "../constants/Urls";
// import {
//     getNowPlayingMovies,
//     getUpcomingMovies,
//     getAllGenres,
//   } from "../services/MovieService";

function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafbff",
      }}
    >
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
        Profile
      </Text>
    </View>
  );
}

function Cart() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafbff",
      }}
    >
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Cart</Text>
    </View>
  );
}

function HomeRoot() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafbff",
      }}
    >
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
      HomeRoot
      </Text>
    </View>
  );
}

function FavRoot() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafbff",
      }}
    >
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>FavRoot</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = ({navigation}) => {
const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
//   const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);

useEffect(() => {

    const NowPlayingUrl = TMDB_BASE_URL+ENDPOINTS.NOW_PLAYING_MOVIES+TMDB_API_KEY;
    const UpComingUrl = TMDB_BASE_URL+ENDPOINTS.UPCOMING_MOVIES+TMDB_API_KEY;

    fetch(NowPlayingUrl)
      .then((response) => response.json())
      .then((json) => setNowPlayingMovies(json))
      .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
    fetch(UpComingUrl)
    .then((response) => response.json())
    .then((json) => setUpcomingMovies(json))
    .catch((error) => console.error(error))

    // getNowPlayingMovies().then((movieResponse) =>
    //   setNowPlayingMovies(movieResponse.data)
    // //   console.log("Failed",movieResponse.data)
    // );
    // getUpcomingMovies().then((movieResponse) =>
    //   setUpcomingMovies(movieResponse.data)
    // );
    // getAllGenres().then((genreResponse) =>
    //   setGenres([...genres, ...genreResponse.data.genres])
    // );

  }, []);
  return (
    <>
    <ScrollView style={styles.container}>
      
      <StatusBar style="auto" translucent= {false} backgroundColor={COLORS.BASIC_BACKGROUND}/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View style={styles.genreListContainer}>
        <FlatList
          data={Genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
            genreName={item}
            active={item === activeGenre ? true : false}
            onPress={setActiveGenre}
            />
            )}
            />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            heartLess={false}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
            )}
            />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
            )}
            />
      </View>
    </ScrollView>

<NavigationContainer independent={true}>
<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      let iconName;
      if (route.name === "Favorites") {
        iconName = focused ? "heart" : "heart-outline";
      } else if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Cart") {
        iconName = focused ? "cart" : "cart-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person-circle" : "person-circle-outline";
      }
      return (
        <Ionicons
        name={iconName}
        size={22}
        color={focused ? "#F44648" : "darkgrey"}
        />
        );
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        height: 74,
        elevation: undefined,
        backgroundColor: "F9FAFE",
        borderTopWidth: 0,
        backgroundColor: "#fff",
      },
  })}
>
  <Tab.Screen name="Home" component={HomeRoot} />
  <Tab.Screen name="Favorites" component={FavRoot} />
  <Tab.Screen name="Cart" component={Cart} />
  <Tab.Screen name="Profile" component={Profile} />
</Tab.Navigator>
</NavigationContainer>
</>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: COLORS.BASIC_BACKGROUND,
      },
      headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      headerTitle: {
        fontSize: 28,
        fontFamily: FONTS.REGULAR,
      },
      headerSubTitle: {
        fontSize: 13,
        color: COLORS.ACTIVE,
        fontFamily: FONTS.BOLD,
      },
      genreListContainer: {
        paddingVertical: 10,
      },
});

export default HomeScreen
