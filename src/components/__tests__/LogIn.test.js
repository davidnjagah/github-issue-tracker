import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../Store";
import { ApolloProvider } from "@apollo/client";
import client from "../../graphql/client";
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import LogIn from "../LogIn";
import Navigator from "../../routes/stack";

const MockLogIn = () =>{
    <ApolloProvider client={client}>
      <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <LogIn/>
      </ApplicationProvider>
      </Provider>
    </ApolloProvider>
}


it("renders default elements", ()=>{

    render(<MockLogIn/>);
})