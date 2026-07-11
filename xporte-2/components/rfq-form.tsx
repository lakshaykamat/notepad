"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleCheck, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { VerifiedBadge } from "@/components/verified-badge";
import { shippingTerms, type Vendor } from "@/lib/data";

const units = ["pieces", "sets", "kg", "cartons"];

export function RfqForm({
  vendor,
  preselectedProductId,
}: {
  vendor: Vendor;
  preselectedProductId?: string;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    preselectedProductId ? [preselectedProductId] : [],
  );
  const [unit, setUnit] = useState(units[0]);
  const [terms, setTerms] = useState<string>(shippingTerms[0]);
  const [productError, setProductError] = useState(false);
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );
  const [reference, setReference] = useState("");

  const selected = vendor.products.filter((p) =>
    selectedProducts.includes(p.id),
  );

  function toggleProduct(productId: string, checked: boolean) {
    setProductError(false);
    setSelectedProducts((prev) =>
      checked ? [...prev, productId] : prev.filter((id) => id !== productId),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedProducts.length === 0) {
      setProductError(true);
      return;
    }
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;
    setReference(`RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(data);
    window.scrollTo({ top: 0 });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CheckCircle2 className="mb-2 size-9 text-brand" />
            <CardTitle className="text-xl">
              RFQ submitted to {vendor.name}
            </CardTitle>
            <CardDescription>
              Reference{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {reference}
              </span>
              . A copy has been sent to {submitted.email}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-background p-4 text-sm">
              <SummaryRow
                label="Products"
                value={selected.map((p) => p.name).join(", ")}
              />
              <SummaryRow
                label="Quantity"
                value={`${submitted.quantity} ${unit}`}
              />
              {submitted.targetPrice && (
                <SummaryRow label="Target price" value={submitted.targetPrice} />
              )}
              <SummaryRow label="Destination" value={submitted.destination} />
              <SummaryRow label="Timeline" value={submitted.timeline} />
              <SummaryRow label="Shipping terms" value={terms} />
              <SummaryRow
                label="Contact"
                value={`${submitted.contactName}, ${submitted.company}`}
              />
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-brand uppercase">
                What happens next
              </h3>
              <ol className="mt-3 space-y-3">
                <TimelineStep
                  icon={FileText}
                  title="Vendor reviews your request"
                  body="Your RFQ goes directly to the export desk."
                />
                <TimelineStep
                  icon={Clock}
                  title={`Quotation ${vendor.responseTime}`}
                  body="Firm pricing based on your quantity and terms."
                />
                <TimelineStep
                  icon={CircleCheck}
                  title="Negotiate and confirm"
                  body="Agree on final specs, payment, and delivery."
                />
              </ol>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              variant="outline"
              render={<Link href={`/showroom/${vendor.id}`} />}
            >
              Back to showroom
            </Button>
            <Button variant="ghost" render={<Link href="/vendors" />}>
              Browse more vendors
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Request a Quotation</CardTitle>
            <CardDescription>
              Takes about two minutes. {vendor.name} responds{" "}
              {vendor.responseTime}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-brand uppercase">
                Products
              </h3>
              <div className="space-y-2">
                {vendor.products.map((product) => (
                  <Label
                    key={product.id}
                    className="flex items-center gap-3 rounded-md border bg-background p-3 font-normal transition-colors has-[[data-state=checked]]:border-brand/50 has-[[data-state=checked]]:bg-brand/5"
                  >
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) =>
                        toggleProduct(product.id, checked === true)
                      }
                    />
                    <span className="flex-1">{product.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      MOQ {product.moq}
                    </span>
                  </Label>
                ))}
                {productError && (
                  <p className="text-sm text-destructive" role="alert">
                    Select at least one product to continue.
                  </p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Quantity" required>
                  <Input name="quantity" type="number" min={1} required />
                </Field>
                <Field label="Unit">
                  <Select
                    value={unit}
                    onValueChange={(value) => value && setUnit(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Target price / unit"
                  helper="Optional, helps vendors quote faster"
                >
                  <Input name="targetPrice" placeholder="e.g. $3.50" />
                </Field>
              </div>
              <Field label="Customization notes">
                <Textarea
                  name="notes"
                  placeholder="Sizes, colors, branding, packaging requirements..."
                />
              </Field>
            </section>

            <Separator />

            <section className="space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-brand uppercase">
                Delivery
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Destination country / port" required>
                  <Input
                    name="destination"
                    placeholder="e.g. Rotterdam, NL"
                    required
                  />
                </Field>
                <Field label="Expected timeline" required>
                  <Input
                    name="timeline"
                    placeholder="e.g. within 60 days"
                    required
                  />
                </Field>
                <Field label="Shipping terms">
                  <Select
                    value={terms}
                    onValueChange={(value) => value && setTerms(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {shippingTerms.map((term) => (
                        <SelectItem key={term} value={term}>
                          {term}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h3 className="text-xs font-semibold tracking-widest text-brand uppercase">
                Your details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company name" required>
                  <Input name="company" autoComplete="organization" required />
                </Field>
                <Field label="Contact person" required>
                  <Input name="contactName" autoComplete="name" required />
                </Field>
                <Field label="Business email" required>
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <Input name="phone" type="tel" autoComplete="tel" />
                </Field>
                <Field label="Country" required>
                  <Input name="country" autoComplete="country-name" required />
                </Field>
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex-col items-start gap-3">
            <Button
              type="submit"
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Send RFQ
            </Button>
            <p className="text-xs text-muted-foreground">
              Sent directly to the vendor's export desk. No commission on your
              first order.
            </p>
          </CardFooter>
        </Card>
      </form>

      {/* Summary sidebar */}
      <aside className="order-first lg:order-none lg:sticky lg:top-22">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{vendor.name}</p>
            <VerifiedBadge />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {vendor.location} · responds {vendor.responseTime}
          </p>
          <Separator className="my-4" />
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Selected products
          </p>
          {selected.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              No products selected yet.
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {selected.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span>{product.name}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {product.priceRange.split(" / ")[0]}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Separator className="my-4 hidden lg:block" />
          <div className="hidden lg:block">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              What happens next
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                RFQ goes straight to the export desk
              </li>
              <li className="flex gap-2">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                Firm quote {vendor.responseTime}
              </li>
              <li className="flex gap-2">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                Negotiate specs, payment, and delivery
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  required,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b py-2 first:pt-0 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function TimelineStep({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof FileText;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}
