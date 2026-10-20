import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell py-24">
      <p className="eyebrow">DRAWING NOT FOUND / 404</p>
      <h1 className="section-title mb-6">
        This material sheet is unavailable.
      </h1>
      <Link href="/materials" className="button">
        Return to material catalog
      </Link>
    </div>
  );
}
