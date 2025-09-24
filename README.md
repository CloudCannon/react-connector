# CloudCannon React Connector

[![npm version](https://img.shields.io/npm/v/@cloudcannon/react-connector.svg)](https://www.npmjs.org/package/@cloudcannon/react-connector)
[![install size](https://packagephobia.now.sh/badge?p=@cloudcannon/react-connector)](https://packagephobia.now.sh/result?p=@cloudcannon/react-connector)
[![npm downloads](https://img.shields.io/npm/dm/@cloudcannon/react-connector.svg)](http://npm-stat.com/charts.html?package=@cloudcannon/react-connector)

Using a React based SSG? Want to see give your editors a live visual editing experience? Use the React Connector and connect CloudCannon.

## Installation

```bash
npm i @cloudcannon/react-connector
```

## Next JS Integration

Update the code in `pages/_app.jsx` from:

```js
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}
```

to:

```js
import { CloudCannonConnect } from '@cloudcannon/react-connector';

export default function App({ Component, pageProps }) {
	const AppComponent = CloudCannonConnect(Component);
	return <AppComponent {...pageProps} />
}
```

In CloudCannon will now push through new page props from your editors updates. 

### CloudCannon options

By default CloudCannon passes through processed markdown as HTML and new files as blobs. Both of these options are configurable
using the `valueOptions` parameter. If you have a markdown processor built into your component set `keepMarkdownAsHTML`
to false, this will prevent any double processing conflicts.

```js
import { CloudCannonConnect } from '@cloudcannon/react-connector';

export default function App({ Component, pageProps }) {
	const AppComponent = CloudCannonConnect(Component, {
		valueOptions: {
			keepMarkdownAsHTML: false,
			preferBlobs: true
		}
	});
	return <AppComponent {...pageProps} />
}
```

### Modifying the props

If your props are modified in the `getStaticProps` function you can mirror those same operations. Below is an example of 
the `processProps` function which is passed the props before it is injected into the new props. This defaults to an identity
function which passes the props directly through.

```js
import { CloudCannonConnect } from '@cloudcannon/react-connector';

export default function App({ Component, pageProps }) {
	const AppComponent = CloudCannonConnect(Component, {
		processProps: (props) => {
			return props;
		}
	});
	return <AppComponent {...pageProps} />
}
```
