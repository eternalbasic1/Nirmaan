import type { ReactNode } from "react";
export function TechnicalCard({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <section className={`border border-line bg-plate p-5 ${className}`}>
      {title && <h3 className="technical-label mb-3">{title}</h3>}
      {children}
    </section>
  );
}
