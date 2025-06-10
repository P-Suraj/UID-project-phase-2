import { ApolloWrapper } from './ApolloWrapper';

import './globals.css';

export default function RootLayout({ children }) {
return (
	<html lang="en">
		<body>
			<ApolloWrapper>
			{children}
			</ApolloWrapper>
		</body>
	</html>
);
}