import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IssuePage from "../components/IssuePage";
import LogIn from "../components/LogIn";
import IssueDescription from "../components/IssueDescriptionPage";

const screens = {
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: "GitHub Issue Tracker"
    }
  },
  IssuePage: {
    screen: IssuePage,
    navigationOptions: {
      title: "Issues Page"
    }
  },
  IssueDescription: {
    screen: IssueDescription,
    navigationOptions: {
      title: "Issues Description Page"
    }
  },
};

const Stack = createStackNavigator(screens,
  {
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerStyle: { backgroundColor: '#eee' }
    }
  });

export default createAppContainer(Stack);
