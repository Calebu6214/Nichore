import Document, { Head, Html, Main, NextScript } from "next/document";
import { JSXElementConstructor, ReactElement } from "react";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: ReactElement<{}, string | JSXElementConstructor<any>>[];
}
export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inder&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <link rel="favicon" href="/favicon.ico" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
