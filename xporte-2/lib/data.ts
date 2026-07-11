export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  moq: string;
  priceRange: string;
  leadTime: string;
  packaging: string;
  specs: { label: string; value: string }[];
};

export type Vendor = {
  id: string;
  name: string;
  location: string;
  category: string;
  coverImage: string;
  yearsInBusiness: number;
  certifications: string[];
  exportMarkets: string[];
  responseTime: string;
  responseRate: string;
  intro: string;
  products: Product[];
};

export const vendors: Vendor[] = [
  {
    id: "sharma-textiles",
    name: "Sharma Textiles",
    location: "Panipat, India",
    category: "Home Textiles",
    coverImage:
      "https://images.unsplash.com/photo-1524292332709-b33366a7f165?q=80&w=1600&auto=format&fit=crop",
    yearsInBusiness: 18,
    certifications: ["ISO 9001", "OEKO-TEX", "GOTS"],
    exportMarkets: ["USA", "UK", "Germany", "UAE"],
    responseTime: "within 24 hours",
    responseRate: "98%",
    intro:
      "Manufacturer and exporter of handloom and powerloom home textiles. In-house dyeing, weaving, and finishing with a monthly capacity of 200,000 pieces.",
    products: [
      {
        id: "cotton-bath-towels",
        name: "Cotton Bath Towels",
        category: "Bath Linen",
        image:
          "https://images.unsplash.com/photo-1639298109207-5a9ccc254481?q=80&w=800&auto=format&fit=crop",
        moq: "500 pcs",
        priceRange: "$2.80 - $4.50 / pc",
        leadTime: "30-40 days",
        packaging: "Individual polybag, 24 pcs per export carton",
        specs: [
          { label: "Material", value: "100% combed cotton" },
          { label: "GSM", value: "500-600" },
          { label: "Size", value: "70 x 140 cm (customizable)" },
          { label: "Colors", value: "Any Pantone shade" },
        ],
      },
      {
        id: "jacquard-cushion-covers",
        name: "Jacquard Cushion Covers",
        category: "Living",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
        moq: "1,000 pcs",
        priceRange: "$1.90 - $3.20 / pc",
        leadTime: "35-45 days",
        packaging: "Polybag with insert card, 50 pcs per carton",
        specs: [
          { label: "Material", value: "Cotton-poly jacquard" },
          { label: "Size", value: "45 x 45 cm (customizable)" },
          { label: "Closure", value: "Hidden zipper" },
          { label: "Customization", value: "Custom weave patterns, labels" },
        ],
      },
      {
        id: "kitchen-towel-sets",
        name: "Kitchen Towel Sets",
        category: "Kitchen Linen",
        image:
          "https://images.unsplash.com/photo-1596433904747-e8b061219a71?q=80&w=800&auto=format&fit=crop",
        moq: "2,000 sets",
        priceRange: "$1.20 - $2.10 / set",
        leadTime: "25-35 days",
        packaging: "Set of 3 with belly band, 40 sets per carton",
        specs: [
          { label: "Material", value: "100% cotton twill" },
          { label: "GSM", value: "220-260" },
          { label: "Size", value: "40 x 60 cm" },
          { label: "Print", value: "Screen or digital print" },
        ],
      },
    ],
  },
  {
    id: "meridian-steelworks",
    name: "Meridian Steelworks",
    location: "Ludhiana, India",
    category: "Kitchenware",
    coverImage:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop",
    yearsInBusiness: 25,
    certifications: ["ISO 9001", "BSCI", "FDA Approved"],
    exportMarkets: ["USA", "Canada", "Australia", "Netherlands"],
    responseTime: "within 12 hours",
    responseRate: "99%",
    intro:
      "Stainless steel kitchenware manufacturer with fully automated press shop and electro-polishing line. OEM and private label production for global retail brands.",
    products: [
      {
        id: "ss-mixing-bowls",
        name: "Stainless Steel Mixing Bowls",
        category: "Prep Ware",
        image:
          "https://images.unsplash.com/photo-1593143303977-01da2fd61984?q=80&w=800&auto=format&fit=crop",
        moq: "1,000 sets",
        priceRange: "$4.20 - $7.80 / set",
        leadTime: "40-50 days",
        packaging: "Color box, 12 sets per master carton",
        specs: [
          { label: "Material", value: "SS 304, 0.6 mm" },
          { label: "Set", value: "3 pcs (1.5L / 3L / 5L)" },
          { label: "Finish", value: "Mirror or satin" },
          { label: "Base", value: "Optional silicone non-slip" },
        ],
      },
      {
        id: "insulated-water-bottles",
        name: "Insulated Water Bottles",
        category: "Drinkware",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
        moq: "3,000 pcs",
        priceRange: "$3.10 - $5.60 / pc",
        leadTime: "45-55 days",
        packaging: "White box or custom color box",
        specs: [
          { label: "Material", value: "SS 304 inner, SS 201 outer" },
          { label: "Capacity", value: "500 / 750 / 1000 ml" },
          { label: "Insulation", value: "Double wall vacuum, 24h cold" },
          { label: "Branding", value: "Laser engraving, silk print" },
        ],
      },
    ],
  },
  {
    id: "verde-agro-exports",
    name: "Verde Agro Exports",
    location: "Kochi, India",
    category: "Spices & Food",
    coverImage:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop",
    yearsInBusiness: 12,
    certifications: ["FSSAI", "HACCP", "USDA Organic"],
    exportMarkets: ["USA", "UK", "Japan", "Saudi Arabia"],
    responseTime: "within 24 hours",
    responseRate: "96%",
    intro:
      "Processor and exporter of single-origin spices and value-added food products, sourced directly from farmer cooperatives in Kerala and Karnataka.",
    products: [
      {
        id: "black-pepper-whole",
        name: "Whole Black Pepper (Malabar)",
        category: "Spices",
        image:
          "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop",
        moq: "500 kg",
        priceRange: "$6.80 - $8.40 / kg",
        leadTime: "15-25 days",
        packaging: "25 kg multi-wall paper bags or private label retail packs",
        specs: [
          { label: "Grade", value: "MG1 / TGSEB" },
          { label: "Moisture", value: "Max 11%" },
          { label: "Piperine", value: "Min 5.5%" },
          { label: "Origin", value: "Malabar coast, single origin" },
        ],
      },
      {
        id: "turmeric-powder",
        name: "Turmeric Powder (High Curcumin)",
        category: "Spices",
        image:
          "https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=800&auto=format&fit=crop",
        moq: "1,000 kg",
        priceRange: "$2.40 - $3.60 / kg",
        leadTime: "20-30 days",
        packaging: "25 kg bags, retail jars, or sachets",
        specs: [
          { label: "Curcumin", value: "3-5%" },
          { label: "Mesh", value: "60-80" },
          { label: "Certification", value: "USDA Organic available" },
          { label: "Testing", value: "Batch-wise lab reports included" },
        ],
      },
      {
        id: "coconut-milk-powder",
        name: "Coconut Milk Powder",
        category: "Food Ingredients",
        image:
          "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?q=80&w=800&auto=format&fit=crop",
        moq: "2,000 kg",
        priceRange: "$4.90 - $6.20 / kg",
        leadTime: "25-35 days",
        packaging: "20 kg bag-in-box or private label pouches",
        specs: [
          { label: "Fat content", value: "60-65%" },
          { label: "Solubility", value: "Instant, spray dried" },
          { label: "Shelf life", value: "18 months" },
          { label: "Additives", value: "Maltodextrin carrier only" },
        ],
      },
    ],
  },
];

export const shippingTerms = ["FOB", "CIF", "EXW", "DDP"] as const;

export function getVendor(id: string) {
  return vendors.find((v) => v.id === id);
}
