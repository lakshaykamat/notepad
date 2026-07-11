import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductSheet } from "@/components/product-sheet";
import { VerifiedBadge } from "@/components/verified-badge";
import { getVendor } from "@/lib/data";

export default async function ShowroomPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;
  const vendor = getVendor(vendorId);
  if (!vendor) notFound();

  const stats = [
    { label: "Years in business", value: `${vendor.yearsInBusiness}` },
    { label: "Response rate", value: vendor.responseRate },
    { label: "Responds", value: vendor.responseTime },
    { label: "Export markets", value: `${vendor.exportMarkets.length}` },
  ];

  const initials = vendor.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Cover banner */}
      <div className="relative h-48 sm:h-64">
        <Image
          src={vendor.coverImage}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-primary/40" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header card overlapping the banner */}
        <div className="relative z-10 -mt-14 rounded-xl border bg-card shadow-lg shadow-primary/10 sm:-mt-16">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-lg font-bold text-primary sm:size-20 sm:text-2xl">
                {initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {vendor.name}
                  </h1>
                  <VerifiedBadge />
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {vendor.location} · {vendor.category}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="hidden bg-brand text-brand-foreground hover:bg-brand/90 lg:inline-flex"
              render={<Link href={`/showroom/${vendor.id}/rfq`} />}
            >
              Request Quotation
            </Button>
          </div>
          <div className="grid grid-cols-2 divide-y border-t sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-5 py-4 sm:px-6">
                <p className="text-lg font-bold tabular-nums">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <nav
          aria-label="Breadcrumb"
          className="mt-6 flex items-center gap-1 text-sm text-muted-foreground"
        >
          <Link href="/vendors" className="hover:text-foreground">
            Vendors
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{vendor.name}</span>
        </nav>

        {/* About */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-brand uppercase">
              About
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {vendor.intro}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Exports to: </span>
              {vendor.exportMarkets.join(", ")}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-brand uppercase">
              Certifications
            </h2>
            <ul className="mt-3 space-y-2">
              {vendor.certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="size-4 text-brand" />
                  {cert}
                  <Badge variant="outline" className="ml-auto">
                    On file
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products */}
        <section className="mt-12 mb-16">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold tracking-tight">Products</h2>
            <p className="text-sm text-muted-foreground">
              {vendor.products.length} listed
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendor.products.map((product) => (
              <ProductSheet
                key={product.id}
                product={product}
                vendorId={vendor.id}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky RFQ bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card p-3 lg:hidden">
        <Button
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
          size="lg"
          render={<Link href={`/showroom/${vendor.id}/rfq`} />}
        >
          Request Quotation
        </Button>
      </div>
    </div>
  );
}
