import 'react-native-gesture-handler';
import React from "react";
import { Provider } from "react-redux";
import store from "./src/Store";
import { ApolloProvider } from "@apollo/client";
import Navigator from "./src/routes/stack";
import client from "./src/graphql/client";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';


const App = () => {
    return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Navigator/>
      </ApplicationProvider>
      </Provider>
    </ApolloProvider>
    );
}

export default App;
