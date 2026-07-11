import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { RfqForm } from "@/components/rfq-form";
import { getVendor } from "@/lib/data";

export default async function RfqPage({
  params,
  searchParams,
}: {
  params: Promise<{ vendorId: string }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { vendorId } = await params;
  const { product } = await searchParams;
  const vendor = getVendor(vendorId);
  if (!vendor) notFound();

  const preselected = vendor.products.find((p) => p.id === product)?.id;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link href="/vendors" className="hover:text-foreground">
          Vendors
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/showroom/${vendor.id}`} className="hover:text-foreground">
          {vendor.name}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Request quotation</span>
      </nav>
      <RfqForm vendor={vendor} preselectedProductId={preselected} />
    </div>
  );
}
