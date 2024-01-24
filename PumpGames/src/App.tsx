import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import useCachedResources from "src/hooks/useCachedResources";
import HomeScreen from "src/screens/HomeScreen";
import { setPresetScreenHeight, verticalScale } from "src/utils/scaleHelper";

const App = () => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const isCachedComplete = useCachedResources();
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    const { height } = Dimensions.get("window");

    if (height - frame.height > 200) {
      setPresetScreenHeight(height - insets.top - insets.bottom);
    } else {
      setPresetScreenHeight(frame.height - insets.top - insets.bottom);
    }
  }, [frame.height, insets.top, insets.bottom, isDone]);
  useEffect(() => {
    if (isCachedComplete) {
      setIsDone(true);
    }
  }, [isCachedComplete]);
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0, .5)",
      }}
    >
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
