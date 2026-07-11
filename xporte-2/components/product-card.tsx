import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5">
      <div className="relative h-40 overflow-hidden border-b bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight">{product.name}</h3>
        </div>
        <Badge variant="secondary" className="mt-1.5 w-fit">
          {product.category}
        </Badge>
        <div className="mt-4 grid grid-cols-3 divide-x rounded-md border bg-background text-center">
          <div className="px-1 py-2">
            <p className="text-[11px] text-muted-foreground">MOQ</p>
            <p className="text-xs font-semibold tabular-nums">{product.moq}</p>
          </div>
          <div className="px-1 py-2">
            <p className="text-[11px] text-muted-foreground">Price</p>
            <p className="text-xs font-semibold tabular-nums">
              {product.priceRange.split(" / ")[0]}
            </p>
          </div>
          <div className="px-1 py-2">
            <p className="text-[11px] text-muted-foreground">Lead time</p>
            <p className="text-xs font-semibold tabular-nums">
              {product.leadTime}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs font-medium text-brand">
          View specifications
        </p>
      </div>
    </div>
  );
}
