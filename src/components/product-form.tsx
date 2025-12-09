
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addProduct, updateProduct } from "@/lib/actions/product-actions";
import { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.enum(["Men's Apparel", "Women's Apparel", "Home & Living", "Accessories"]),
  color: z.enum(["Green", "Beige", "Brown", "White", "Black"]),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  image: z.string().url("Image must be a valid URL."),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "Men's Apparel",
      color: "White",
      stock: 0,
      image: "",
    },
  });

  useEffect(() => {
    if (initialData?.image) {
      form.setValue('image', initialData.image);
      setImagePreview(initialData.image);
    }
  }, [initialData, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);

    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        toast({
          title: "Image upload failed",
          description: "Please try again.",
          variant: "destructive",
        });
        setUploadProgress(null);
        setImagePreview(initialData?.image || null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          form.setValue("image", downloadURL, { shouldValidate: true });
          setUploadProgress(null); // Clear progress on success
          toast({
            title: "Image uploaded successfully!",
          });
        });
      }
    );
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (!data.image) {
        toast({ title: "Image required", description: "Please upload an image for the product.", variant: "destructive" });
        return;
    }
    if (uploadProgress !== null && uploadProgress < 100) {
        toast({ title: "Please wait", description: "Image is still uploading.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    try {
      if (initialData) {
        await updateProduct({ id: initialData.id, ...data });
        toast({ title: "Product updated successfully!" });
      } else {
        await addProduct(data);
        toast({ title: "Product created successfully!" });
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Could not save the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-2 grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Khadi Kurta" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1200" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Describe the product..."
                            className="resize-none h-32"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
             </div>
              <div className="space-y-2">
                <FormLabel>Product Image</FormLabel>
                <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center relative overflow-hidden">
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Product preview" fill style={{ objectFit: 'cover' }} data-ai-hint="product image" />
                    ) : (
                        <div className="text-center text-muted-foreground p-4">
                            <UploadCloud className="mx-auto h-12 w-12" />
                            <p className="mt-2 text-sm">Click to upload or drag and drop</p>
                            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                    <Input title=" " id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
                </div>
                {uploadProgress !== null && <Progress value={uploadProgress} className="mt-2" />}
                <FormField control={form.control} name="image" render={({ field }) => (
                    <FormItem className="hidden">
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Men's Apparel">Men's Apparel</SelectItem>
                    <SelectItem value="Women's Apparel">Women's Apparel</SelectItem>
                    <SelectItem value="Home & Living">Home & Living</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Beige">Beige</SelectItem>
                    <SelectItem value="Brown">Brown</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting || (uploadProgress !== null && uploadProgress < 100)}>
          {isSubmitting ? "Saving..." : initialData ? "Save changes" : "Create product"}
        </Button>
      </form>
    </Form>
  );
}
