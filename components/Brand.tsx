import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="MaterialHub home"
      className={`brand-wordmark inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display font-bold tracking-[-1px] ${compact ? "text-lg" : "text-[20px] lg:text-[22px]"}`}
    >
      <img
        src="/materialhub-mark.svg"
        alt=""
        aria-hidden="true"
        width={40}
        height={30}
        className="h-[30px] w-10 shrink-0"
      />
      <span>
        Material<span className="brand-hub">Hub</span>
      </span>
    </Link>
  );
}
