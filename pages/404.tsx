import Head from "next/head";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | CeraHub</title>
      </Head>
      <div className="market-home shell commerce-page">
        <div className="empty-state">
          <p className="commerce-eyebrow">Page not found · 404</p>
          <h1 className="text-3xl font-semibold mb-4">
            We could not find this page.
          </h1>
          <p>
            The link may have changed, or this material may no longer be listed.
          </p>
          <Link href="/materials" className="button">
            Shop materials
          </Link>
        </div>
      </div>
    </>
  );
}
