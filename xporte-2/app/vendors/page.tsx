import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { VendorDirectory } from "@/components/vendor-directory";
import { vendors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Verified Vendors - Xporte",
  description:
    "Browse verified export manufacturers, compare certifications, and request quotations.",
};

export default function VendorsPage() {
  return (
    <div className="flex-1">
      {/* Page banner */}
      <div className="relative overflow-hidden bg-primary">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-sm text-primary-foreground/70"
          >
            <Link href="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-primary-foreground">Vendors</span>
          </nav>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Verified vendors
          </h1>
          <p className="mt-2 max-w-lg text-primary-foreground/70">
            {vendors.length} manufacturers, independently verified and ready to
            quote.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <VendorDirectory vendors={vendors} />
      </div>
    </div>
  );
}
