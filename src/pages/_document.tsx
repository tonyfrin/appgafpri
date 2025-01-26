import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Script del SDK de Square */}
        <script
          type="text/javascript"
          src="https://sandbox.web.squarecdn.com/v1/square.js"
          async
        ></script>
        <script 
          src="https://assets.complycube.com/web-sdk/v1/complycube.min.js"
        ></script>
        <link 
          rel="stylesheet"
          href="https://assets.complycube.com/web-sdk/v1/style.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

