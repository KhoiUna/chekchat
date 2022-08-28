import React from "react";
import Document, { Html, Main, NextScript, Head } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="The app for assigning tasks" />
          <meta
            name="keywords"
            content="chekchat, task app, productivity app, chat app"
          />
          <meta name="twitter:card" content="summary" />

          {/* Open Graph meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://chekchat.xyz/" />
          <meta property="og:title" content="ChekChat | Home" />
          <meta
            property="og:image"
            content="https://www.chekchat.xyz/images/192x192.png"
          />
          <meta
            property="og:description"
            content="The app for assigning tasks. Register to make your team more productive."
          />

          <link rel="canonical" href="https://chekchat.xyz/" />
          <link rel="image_src" href="/logo192.png" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
