# CloudCannon React Connector



[![npm version](https://img.shields.io/npm/v/@cloudcannon/react-connector.svg)](https://www.npmjs.org/package/@cloudcannon/react-connector)
[![install size](https://packagephobia.now.sh/badge?p=@cloudcannon/react-connector)](https://packagephobia.now.sh/result?p=@cloudcannon/react-connector)
[![npm downloads](https://img.shields.io/npm/dm/@cloudcannon/react-connector.svg)](http://npm-stat.com/charts.html?package=@cloudcannon/react-connector)

Using a React based SSG? Want to see give your editors a live visual editing experience? Use the React Connector and connect CloudCannon.

```
npm i @cloudcannon/react-connector
```

## Next JS Install

Update the code in `pages/_app.jsx` from:

```
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}
```

to:

```
import { CloudCannonConnect } from '@cloudcannon/react-connector'

export default function App({ Component, pageProps }) {
	const AppComponent = CloudCannonConnect(Component);
	return <AppComponent {...pageProps}/>
}
```

In CloudCannon will now push through new page props from your editors updates. 