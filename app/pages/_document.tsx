import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = Record<string, unknown>

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <body className="font-notsans bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
