import Link from "next/link";
import { Brand } from "./Brand";
export function GlobalFooter() {
  const groups = [
    {
      title: "Shop",
      links: [
        ["All materials", "/materials"],
        ["Cement & steel", "/categories/cement-steel"],
        ["Electrical & wiring", "/categories/electrical"],
        ["Plumbing & pipes", "/categories/pipes"],
      ],
    },
    {
      title: "Your orders",
      links: [
        ["My orders", "/dashboard"],
        ["Delivery information", "/help#delivery"],
        ["Order issues & returns", "/help#returns"],
        ["Get help", "/help#contact"],
      ],
    },
    {
      title: "About CeraHub",
      links: [
        ["How pricing works", "/help#pricing"],
        ["Privacy", "/help#privacy"],
        ["Terms", "/help#terms"],
      ],
    },
  ];
  return (
    <footer className="commerce-footer">
      <div className="shell">
        <div className="commerce-footer-grid">
          <div>
            <Brand compact />
            <p>
              Building materials, clear prices and delivery to your doorstep.
            </p>
            <p className="muted-copy">
              Starting in Telangana. Delivery areas and confirmed prices will be
              published before launch.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h2>{g.title}</h2>
              <ul>
                {g.links.map(([name, href]) => (
                  <li key={name}>
                    <Link href={href}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="commerce-footer-bottom">
          <span>© {new Date().getFullYear()} CeraHub</span>
          <span>
            Website preview · Sample prices · No live orders or payments
          </span>
        </div>
      </div>
    </footer>
  );
}
