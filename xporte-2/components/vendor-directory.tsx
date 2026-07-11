"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { VendorCard } from "@/components/vendor-card";
import { cn } from "@/lib/utils";
import type { Vendor } from "@/lib/data";

export function VendorDirectory({ vendors }: { vendors: Vendor[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = [...new Set(vendors.map((v) => v.category))];

  const filtered = vendors.filter((vendor) => {
    const matchesCategory = !category || vendor.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      vendor.name.toLowerCase().includes(q) ||
      vendor.location.toLowerCase().includes(q) ||
      vendor.products.some((p) => p.name.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors or products"
            className="bg-card pl-9"
            aria-label="Search vendors or products"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All categories"
            active={category === null}
            onClick={() => setCategory(null)}
          />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={c}
              active={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed bg-card p-12 text-center">
          <p className="font-medium">No vendors match your search</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different keyword or clear the category filter.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <Badge
        variant={active ? "default" : "outline"}
        className={cn("px-3 py-1", !active && "bg-card hover:bg-muted")}
      >
        {label}
      </Badge>
    </button>
  );
}
