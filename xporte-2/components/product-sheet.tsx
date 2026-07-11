"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/data";

export function ProductSheet({
  product,
  vendorId,
}: {
  product: Product;
  vendorId: string;
}) {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer text-left">
        <ProductCard product={product} />
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{product.name}</SheetTitle>
          <SheetDescription>{product.category}</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <div className="relative h-48 overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Specifications</h3>
            <Table>
              <TableBody>
                {product.specs.map((spec) => (
                  <TableRow key={spec.label}>
                    <TableCell className="text-muted-foreground">
                      {spec.label}
                    </TableCell>
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Order details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">MOQ</TableCell>
                  <TableCell>{product.moq}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Price range
                  </TableCell>
                  <TableCell>{product.priceRange}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Lead time
                  </TableCell>
                  <TableCell>{product.leadTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Packaging
                  </TableCell>
                  <TableCell>{product.packaging}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <SheetFooter>
          <Button
            size="lg"
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            render={
              <Link href={`/showroom/${vendorId}/rfq?product=${product.id}`} />
            }
          >
            Request Quotation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
