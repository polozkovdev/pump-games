import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GAMES_LIST } from "src/constants/games";
import { verticalScale } from "src/utils/scaleHelper";

const GamesListScreen = ({ navigation }: any) => {
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        paddingLeft: verticalScale(10),
        paddingRight: verticalScale(10),
      }}
      contentContainerStyle={{ height: "auto" }}
    >
      {GAMES_LIST.map(({ image, title, description }) => {
        return (
          <View
            key={title}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              maxWidth: "100%",
              marginBottom: verticalScale(40),
              gap: verticalScale(20),
            }}
          >
            <Image
              source={image}
              style={{
                maxWidth: verticalScale(100),
                maxHeight: verticalScale(100),
              }}
            />
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                alignSelf: "flex-start",
                gap: verticalScale(20),
                paddingRight: verticalScale(10),
              }}
            >
              <Text
                style={{
                  fontSize: verticalScale(24),
                  lineHeight: verticalScale(24),
                  fontFamily: "Roboto_500Medium",
                  color: "#fff",
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontSize: verticalScale(18),
                  lineHeight: verticalScale(24),
                  fontFamily: "Roboto_400Regular",
                  color: "rgba(255, 255, 255, .5)",
                }}
              >
                {description}
              </Text>
              <TouchableOpacity
                style={{
                  width: verticalScale(120),
                  alignItems: "center",
                  borderRadius: verticalScale(10),
                  borderWidth: verticalScale(1),
                  borderColor: "#00C3AA",
                }}
                onPress={() => navigation.navigate("BlickPuzzle")}
              >
                <Text
                  style={{
                    fontSize: verticalScale(18),
                    fontFamily: "Roboto_500Medium",
                    lineHeight: verticalScale(36),
                    color: "#00C3AA",
                  }}
                >
                  Play
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default GamesListScreen;
