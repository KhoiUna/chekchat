import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chek | Home</title>
      </Head>

      <main>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </main>
    </div>
  );
}
