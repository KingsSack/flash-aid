"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, Navigation } from "lucide-react";
import dynamic from 'next/dynamic';
import { LatLngTuple } from "leaflet"; // Import LatLngTuple
import { useState } from 'react';

// Updated Zod schema to match backend expectations and include lat/lng
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  title: z // Renamed from postTitle
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(50, { message: "Title must be at most 50 characters." }),
  body: z // Renamed from postBody
    .string()
    .min(10, { message: "Post must be at least 10 characters." }) // Adjusted min for typical posts
    .max(500, { message: "Post must be at most 500 characters." }),
  latitude: z.number({
    required_error: "Please provide a latitude.",
    invalid_type_error: "Latitude must be a number.",
  }).refine(val => val >= -90 && val <= 90, { message: "Latitude must be between -90 and 90." }),
  longitude: z.number({
    required_error: "Please provide a longitude.",
    invalid_type_error: "Longitude must be a number.",
  }).refine(val => val >= -180 && val <= 180, { message: "Longitude must be between -180 and 180." }),
});

export type PostFormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  onSubmit: (values: PostFormValues) => void; // Or Promise<void> if async
  isLoading: boolean;
  initialData?: Partial<PostFormValues>; // For editing scenarios
}

export function PostForm({ onSubmit, isLoading, initialData }: PostFormProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialData?.email || "", // Or get from auth context if user is logged in
      title: initialData?.title || "",
      body: initialData?.body || "",
      latitude: initialData?.latitude ?? undefined, // Use undefined for react-hook-form to not treat null as a value initially for required fields
      longitude: initialData?.longitude ?? undefined,
    },
  });

  const { watch, setValue, formState: { errors } } = form;

  const selectedLat = watch("latitude");
  const selectedLng = watch("longitude");

  const handleLocationSelect = (lat: number, lng: number) => {
    setValue("latitude", lat, { shouldValidate: true, shouldDirty: true });
    setValue("longitude", lng, { shouldValidate: true, shouldDirty: true });
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setValue("latitude", latitude, { shouldValidate: true, shouldDirty: true });
        setValue("longitude", longitude, { shouldValidate: true, shouldDirty: true });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Unable to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        alert(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const currentMapSelection: LatLngTuple | undefined =
    typeof selectedLat === 'number' && typeof selectedLng === 'number'
      ? [selectedLat, selectedLng]
      : undefined;

  return (
    <Card className="w-full max-w-2xl shadow-lg"> {/* Increased max-width for map */}
      <CardContent className="pt-6"> {/* Added padding-top */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field - Assuming you need to collect this as per backend */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Post Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the incident or share information..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-lg">Incident Location</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-2"
                >
                  {isGettingLocation ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Getting Location...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-4 w-4" />
                      Use Current Location
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Enter the latitude and longitude coordinates, or use your current location.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g., 40.7128"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? undefined : parseFloat(value));
                          }}
                          value={field.value === undefined ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g., -74.0060"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? undefined : parseFloat(value));
                          }}
                          value={field.value === undefined ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Display selected coordinates (optional for user feedback) */}
              {typeof selectedLat === 'number' && typeof selectedLng === 'number' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Location: {selectedLat.toFixed(5)}, {selectedLng.toFixed(5)}
                  </span>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}