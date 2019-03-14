import { createStackNavigator, createAppContainer, createSwitchNavigator, StackActions, NavigationActions, startSingleScreenApp } from "react-navigation";
import { LoginContainer, MessageContainer, DashboardContainer, AddContactContainer } from './container';


const SignedIn = createStackNavigator({
  Home: {
    screen: DashboardContainer
  },
  AddContact: {
    screen: AddContactContainer
  },
  Message: {
    screen: MessageContainer
  }
});

const SignedOut = createStackNavigator({
  Home: {
    screen: LoginContainer
  },
});

export const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
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


