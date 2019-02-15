import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { LoginContainer, MessageContainer, DashboardContainer } from './container';

const SignedIn = createStackNavigator({
  Home: {
    screen: DashboardContainer
  },
  // Dashboard: {
  //   screen: DashboardContainer
  // },
  Message: {
    screen: MessageContainer
  }
});

const SignedOut = createStackNavigator({
  Home: {
    screen: LoginContainer
  },
  // Dashboard: {
  //   screen: DashboardContainer
  // },
  // Message: {
  //   screen: MessageContainer
  // }
});

export default createRootNavigator = (signedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      SignedIn,
      SignedOut
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  ));
};


