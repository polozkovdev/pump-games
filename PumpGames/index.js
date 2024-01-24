import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import { AppWrapper } from "src/AppWrapper";

Array.prototype.forEachAsync = async function (fn) {
  for (let t of this) {
    await fn(t);
  }
};

Array.prototype.forEachAsyncParallel = async function (fn) {
  await Promise.all(this.map(fn));
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWrapper);
