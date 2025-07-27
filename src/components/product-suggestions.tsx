"use client";

import { useState, useEffect } from "react";
import { suggestProducts } from "@/ai/flows/product-suggestion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Wand2 } from "lucide-react";

interface ProductSuggestionsProps {
  productDescription: string;
}

export default function ProductSuggestions({
  productDescription,
}: ProductSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSuggestions = async () => {
      setLoading(true);
      try {
        const result = await suggestProducts({
          productDescription,
          userHistory: "", // Placeholder for user history
        });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error("Failed to fetch product suggestions:", error);
        setSuggestions([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    getSuggestions();
  }, [productDescription]);

  return (
    <Card className="mt-8 bg-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Wand2 className="w-6 h-6 text-primary" />
          <span>AI Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No suggestions available at the moment.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
