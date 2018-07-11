import {createStackNavigator} from "react-navigation";
import RegisterLocationsScreen from "../../containers/RegisterLocationsScreen";
import RegisterUserInformationScreen from "../../containers/RegisterUserInformationScreen";

const RegisterStack = createStackNavigator({
  UserInformation: {screen: RegisterUserInformationScreen, navigationOptions: {header: null}},
  Locations: {screen: RegisterLocationsScreen, navigationOptions: {header: null}},
  // Personalities: {screen: RegisterPersonalitiesScreen},
  // Tags: {screen: RegisterTagsScreen},
  // Description: {screen: RegisterDescriptionScreen}
});

export default RegisterStack;