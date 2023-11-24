import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://api.sports.roanuz.com/v5/core/RS_P_1650435056524726286/graphql/',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token').then(token => token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'rs-token': token ? token : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // cache: new InMemoryCache(),
  cache: new InMemoryCache({ addTypename: false }),
});
