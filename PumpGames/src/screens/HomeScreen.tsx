import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import BlickPuzzle from "src/games/BlickPuzzle";
import GamesListScreen from "src/screens/GamesListScreen";

import OnboardingScreen from "src/screens/OnboardingScreen";

import { verticalScale } from "src/utils/scaleHelper";

const Stack = createNativeStackNavigator<any>();
const Tab = createBottomTabNavigator();

function Header({ label }: { label: string }) {
  return (
    <View
      style={{
        height: verticalScale(72),
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto_500Medium",
          fontSize: verticalScale(18),
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const ScreenGames = [
  {
    name: "BlickPuzzle",
    component: BlickPuzzle,
  },
];

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        console.log("route", route);
        return {
          tabBarIcon: ({ color }) => {
            return (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name={route.name === "Today" ? "calendar-today" : "games"}
                  size={verticalScale(20)}
                  color={color}
                  style={{
                    lineHeight: verticalScale(20),
                    width: verticalScale(20),
                    textAlignVertical: "center",
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: verticalScale(12),
                    lineHeight: verticalScale(14),
                    marginTop: verticalScale(4),
                    color,
                  }}
                >
                  {route.name}
                </Text>
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarItemStyle: { height: verticalScale(80) },
          tabBarActiveTintColor: "#2ac300",
          tabBarInactiveTintColor: "#ccc",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            padding: 0,
            margin: 0,
            marginBottom: 0,
            height: verticalScale(80),
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "transparent",
            borderTopWidth: 0,
            backgroundColor: "#FFF",
          },
          tabBarLabelPosition: "below-icon",
        };
      }}
    >
      <Tab.Screen
        name="Today"
        component={GamesListScreen}
        options={{
          header: (props) => <Header {...props} label="Today" />,
          tabBarLabel: "Today",
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesListScreen}
        options={{
          header: (props) => {
            return <Header {...props} label="Pump Games" />;
          },
          tabBarLabel: "Games",
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Puzzles"
        component={GamesListScreen}
        options={{
          header: (props) => <Header {...props} label="Puzzles" />,
          headerShown: false,
          tabBarLabel: "Puzzles",
        }}
      />
      <Tab.Screen
        name="Tests"
        component={GamesListScreen}
        options={{
          header: (props) => <Header {...props} label="Tests" />,
          headerShown: false,
          tabBarLabel: "Tests",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={GamesListScreen}
        options={{
          header: (props) => <Header {...props} label="Profile" />,
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="main"
      >
        <Stack.Screen name="main" component={TabNavigator} />
        {ScreenGames.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
