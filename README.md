# CloudCannon React Connector

[![npm version](https://img.shields.io/npm/v/@cloudcannon/react-connector.svg)](https://www.npmjs.org/package/@cloudcannon/react-connector)
[![install size](https://packagephobia.now.sh/badge?p=@cloudcannon/react-connector)](https://packagephobia.now.sh/result?p=@cloudcannon/react-connector)
[![npm downloads](https://img.shields.io/npm/dm/@cloudcannon/react-connector.svg)](http://npm-stat.com/charts.html?package=@cloudcannon/react-connector)

Using a React based SSG? Want to see give your editors a live visual editing experience? Use the React Connector and connect CloudCannon.

## Installation

```
npm i @cloudcannon/react-connector
```

## Next JS APP-router Integration

Include the CloudCannonProvider in `app/layout.jsx`:

```
import { CloudCannonProvider } from "@cloudcannon/react-connector"

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <CloudCannonProvider>
          {children}
        </CloudCannonProvider>
      </body>
    </html>
  )
}

```

Create a client component for rendering content using the React connector and it's useCloudCannon hook. For example:

```
"use client"

import { useEffect, useState } from "react"
import { useCloudCannon } from "@cloudcannon/react-connector"

import Blocks from "@/components/content-blocks"

export const PageContent = ({ content }) => {
  const { pageData } = useCloudCannon()
  const [localContentBlocks, setLocalContentBlocks] = useState(
    content.content_blocks
  )

  useEffect(() => {
    if (pageData?.content_blocks) {
      setLocalContentBlocks(pageData.content_blocks)
    }
  }, [pageData])

  return (
    <main className="">
      <Blocks content_blocks={localContentBlocks} />
    </main>
  )
}

```

And use it in your NextJs app-router pages:

```
export default async function Page({ params }) {
  const page = await getPageFromParams(params)

  return <PageContent content={page} />
}
```

In CloudCannon will now push through new page props from your editors updates.

### CloudCannon options

By default CloudCannon passes through processed markdown as HTML and new files as blobs. Both of these options are configurable
using the `valueOptions` parameter. If you have a markdown processor built into your component set `keepMarkdownAsHTML`
to false, this will prevent any double processing conflicts.

```
import { CloudCannonConnect } from '@cloudcannon/react-connector'

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <CloudCannonProvider options={{
					valueOptions: { keepMarkdownAsHTML: false, preferBlobs: true },
          }}>
          {children}
        </CloudCannonProvider>
      </body>
    </html>
  )
}
```
