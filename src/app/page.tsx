"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import { type Product } from "@/lib/types";
import ProductCard from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Home() {
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
  });
  const [sort, setSort] = useState("price-asc");

  const handleFilterChange = (
    type: "category" | "color",
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.color !== "all") {
      filtered = filtered.filter((p) => p.color === filters.color);
    }

    const [sortKey, sortDirection] = sort.split("-");

    return filtered.sort((a, b) => {
      if (sortKey === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  }, [filters, sort]);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  const colors = ["all", ...Array.from(new Set(products.map(p => p.color)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
          Our Collection
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover handcrafted Khadi products made with love and tradition.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-xl mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-base">Color</Label>
                  <RadioGroup
                    value={filters.color}
                    onValueChange={(value) => handleFilterChange("color", value)}
                    className="mt-2"
                  >
                    {colors.map(c => (
                       <div key={c} className="flex items-center space-x-2">
                         <RadioGroupItem value={c} id={`color-${c}`} />
                         <Label htmlFor={`color-${c}`} className="capitalize">{c}</Label>
                       </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-xl mb-4">Sort by</h3>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <section className="w-full md:w-3/4 lg:w-4/5">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center bg-card p-8 rounded-lg shadow-sm">
                <p className="font-headline text-2xl">No Products Found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
             </div>
          )}
        </section>
      </div>
    </div>
  );
}
