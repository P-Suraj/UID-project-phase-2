
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let client;

function createApolloClient() {
	return new ApolloClient({
		link: new HttpLink({
			uri: 'http://localhost:3000/graphql/',
		}),
		cache: new InMemoryCache(),
		ssrMode: typeof window === 'undefined',
	});
}

export function initializeApollo(initialState = null) {
	const _client = client ?? createApolloClient();
	if (initialState) {
		_client.cache.restore(initialState);
	}
	if (typeof window === 'undefined') return _client;
	if (!client) client = _client;

	return _client;
}

export function useApollo(initialState) {
	return initializeApollo(initialState);
}