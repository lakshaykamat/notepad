import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  MessagesSquare,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/stat";
import { VendorCard } from "@/components/vendor-card";
import { VerifiedBadge } from "@/components/verified-badge";
import { vendors } from "@/lib/data";

const categories = [
  "Home Textiles",
  "Kitchenware",
  "Spices & Food",
  "Handicrafts",
  "Leather Goods",
  "Furniture",
  "Apparel",
];

const steps = [
  {
    icon: Store,
    title: "Browse virtual showrooms",
    body: "Explore verified manufacturers with full company profiles, certifications, and export track records.",
  },
  {
    icon: ClipboardList,
    title: "Review specs and MOQs",
    body: "Every product lists specifications, minimum order quantities, price ranges, and lead times upfront.",
  },
  {
    icon: MessagesSquare,
    title: "Send your RFQ",
    body: "Request a quotation in two minutes. Vendors respond with firm pricing within 24 hours.",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Independently verified",
    body: "Every vendor passes a document check covering business registration, export license, and factory ownership before listing.",
  },
  {
    icon: FileCheck2,
    title: "Certifications on file",
    body: "ISO, GOTS, HACCP, FDA and other certificates are collected and reviewed, not self-declared.",
  },
  {
    icon: MessagesSquare,
    title: "Direct communication",
    body: "Your RFQ goes straight to the manufacturer's export desk. No brokers, no commission on your first order.",
  },
];

export default function Home() {
  const featured = vendors.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-card">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_70%_at_85%_0%,rgb(180_83_9/0.07),transparent),radial-gradient(45%_60%_at_5%_100%,rgb(20_52_63/0.06),transparent)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand uppercase">
              B2B sourcing platform
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Source directly from verified manufacturers
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Browse vendor showrooms, compare specifications and MOQs, and get
              firm quotations within 24 hours. No brokers in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                render={<Link href="/vendors" />}
              >
                Browse vendor showrooms
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/#how-it-works" />}
              >
                How it works
              </Button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-8">
              <Stat value="120+" label="Verified vendors" />
              <Stat value="38" label="Export markets" />
              <Stat value="< 24h" label="Avg. quote time" />
            </div>
          </div>

          {/* Stylized showroom preview */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-primary/10" />
            <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl shadow-primary/10">
              <div className="relative h-24">
                <Image
                  src={vendors[0].coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 0px, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-primary/10" />
              </div>
              <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/5 text-sm font-bold text-primary">
                    ST
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Sharma Textiles</p>
                    <p className="text-xs text-muted-foreground">
                      Panipat, India · 18 yrs
                    </p>
                  </div>
                </div>
                <VerifiedBadge />
              </div>
              <div className="mt-4 space-y-2">
                {vendors[0].products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                  >
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        MOQ {product.moq}
                      </p>
                    </div>
                    <p className="text-xs font-semibold tabular-nums">
                      {product.priceRange.split(" / ")[0]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground">
                <p className="text-sm font-medium">Request Quotation</p>
                <ArrowRight className="size-4" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-6">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Sourcing categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-card">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase">
            How it works
          </p>
          <h2 className="mt-2 max-w-md text-3xl font-bold tracking-tight">
            From first look to firm quote in three steps
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-lg border bg-card p-6 transition-colors duration-200 hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <step.icon className="size-5" />
                  </div>
                  <span className="text-4xl font-extrabold text-muted/80 tabular-nums select-none">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured showrooms */}
      <section className="border-y bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                Featured showrooms
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Manufacturers ready to quote
              </h2>
            </div>
            <Button variant="outline" render={<Link href="/vendors" />}>
              View all vendors
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & safety */}
      <section id="trust" className="scroll-mt-16">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase">
            Trust & safety
          </p>
          <h2 className="mt-2 max-w-md text-3xl font-bold tracking-tight">
            Built for serious buyers
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-lg border bg-card p-6">
                <div className="flex size-10 items-center justify-center rounded-md bg-brand/10 text-brand">
                  <point.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t bg-card">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
            alt="Hannah Kessler"
            width={56}
            height={56}
            className="mx-auto size-14 rounded-full object-cover ring-2 ring-brand/30 ring-offset-4 ring-offset-card"
          />
          <blockquote className="mt-6 text-xl leading-relaxed font-medium text-balance sm:text-2xl">
            "We replaced two sourcing agents with Xporte. Specs and MOQs are
            upfront, and every RFQ we sent was answered inside a day with firm
            pricing."
          </blockquote>
          <p className="mt-6 text-sm font-semibold">Hannah Kessler</p>
          <p className="text-sm text-muted-foreground">
            Head of Procurement, Nordhaus Living (Hamburg)
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-primary">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1600&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary/30" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
              Ready to source?
            </h2>
            <p className="mt-2 text-primary-foreground/70">
              Send your first RFQ today. Quotes within 24 hours, no commission.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            render={<Link href="/vendors" />}
          >
            Browse vendor showrooms
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
