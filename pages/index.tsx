import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Form from "./form";
import ThemeToggle from "./themeToggle";
import { useState } from "react";

export default function Home() {
  const [correctedText, setCorrectedText] = useState<string>();
  return (
    <>
      <Head>
        <title>
          Grammar Police - Identify and correct errors in your writing
        </title>
        <meta
          name="description"
          content="Simply upload your text or paste it into our system and let us handle the rest. In just a few seconds, you'll receive a revised version of your text with all of the grammar mistakes corrected."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/ms-icon-310x310.png" />

        <meta property="og:image:width" content="1200" />

        <meta property="og:image:height" content="630" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}>Grammar Police</code>
          </p>
          <div>
            <a
              href="https://github.com/pntech20"
              target="_blank"
              rel="noopener noreferrer"
            >
              By <code className={styles.code}>pntech20</code>
            </a>
          </div>
          <ThemeToggle />
        </div>

        <Form setCorrectedText={setCorrectedText} />

        <div className={styles.center}>
          {correctedText && <p className={styles.text}>{correctedText}</p>}
        </div>
      </main>
    </>
  );
}
