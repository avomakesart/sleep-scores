//@ts-nocheck
import { createWithApollo } from './create-with-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = (ctx: any) =>
  new ApolloClient({
    uri: 'https://sleep-score.herokuapp.com/graphql',
    credentials: 'include',
    // headers: {
    //   cookie: typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined || '',
    // },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {},
      },
    }),
  })

export const withApollo = createWithApollo(client)
