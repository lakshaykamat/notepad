import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "@/components/verified-badge";
import type { Vendor } from "@/lib/data";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const initials = vendor.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <Link href={`/showroom/${vendor.id}`} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/25 group-hover:shadow-md group-hover:shadow-primary/5">
        <div className="relative h-32 overflow-hidden border-b bg-muted">
          <Image
            src={vendor.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/5 text-sm font-bold text-primary">
                {initials}
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-semibold tracking-tight">
                  {vendor.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {vendor.location}
                </p>
              </div>
            </div>
            <VerifiedBadge />
          </div>

          <div className="mt-4 mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <Badge variant="secondary">{vendor.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {vendor.certifications.slice(0, 2).join(" · ")}
            </span>
          </div>

          <div className="mt-auto border-t pt-4">
            <p className="text-xs text-muted-foreground">
              {vendor.yearsInBusiness} yrs in business · {vendor.responseRate}{" "}
              response rate · {vendor.products.length} products
            </p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
              View showroom
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
