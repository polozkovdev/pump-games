import React from "react";
import { View, Text, Image } from "react-native";
import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

interface IOnboardingScreen {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const OnboardingScreen = ({ image, title, description }: IOnboardingScreen) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={image} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        {title}
      </Text>
      <Text
        style={{ textAlign: "center", marginHorizontal: 20, marginTop: 10 }}
      >
        {description}
      </Text>
    </View>
  );
};

export default OnboardingScreen;
