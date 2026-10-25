import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="CeraHub home"
      className={`brand-wordmark cerahub-brand ${compact ? "cerahub-brand--stacked" : "cerahub-brand--horizontal"}`}
    >
      {compact ? (
        <span className="cerahub-logo-full" aria-hidden="true">
          <img src="/cerahub-logo.png" alt="" width={1254} height={1254} />
        </span>
      ) : (
        <>
          <span className="cerahub-logo-symbol" aria-hidden="true">
            <img src="/cerahub-logo.png" alt="" width={1254} height={1254} />
          </span>
          <span className="cerahub-logo-name" aria-hidden="true">
            <img src="/cerahub-logo.png" alt="" width={1254} height={1254} />
          </span>
        </>
      )}
    </Link>
  );
}
