import Link from "next/link";
import { Container, ShieldCheck } from "lucide-react";

const columns = [
  {
    heading: "Platform",
    links: [
      { label: "Browse vendors", href: "/vendors" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Trust & safety", href: "/#trust" },
      { label: "Become a vendor", href: "/vendors" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Buyer protection", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="h-1 bg-gradient-to-r from-brand via-brand/50 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary-foreground text-primary">
                <Container className="size-4.5" />
              </span>
              <span className="text-lg font-bold tracking-tight">Xporte</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              The B2B sourcing platform connecting international buyers with
              verified export manufacturers.
            </p>
            <p className="mt-6 text-sm text-primary-foreground/70">
              sourcing@xporte.com
              <br />
              +91 11 4000 0000
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold">{column.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © 2026 Xporte Trade Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
            <ShieldCheck className="size-3.5" />
            All vendors independently verified
          </p>
        </div>
      </div>
    </footer>
  );
}
