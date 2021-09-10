# CloudCannon React Connector

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
import CloudCannonConnect from '@cloudcannon/react-connect'

export default function App({ Component, pageProps }) {
	const AppComponent = CloudCannonConnect(Component);
	return <AppComponent {...pageProps}/>
}
```

In CloudCannon will now push through new page props from your editors updates. 