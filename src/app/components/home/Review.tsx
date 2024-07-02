"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ReviewCard from "./ReviewCard";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import { ReviewPopOver } from "./ReviewPopOver";

interface Review {
  customer_name: string;
  rating: number;
  comment: string;
}

const Review = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getReview");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      setTestimonials(json.reviews as Review[]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-poppinsregular text-2xl mb-3">Testimonials</h1>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="mb-4 w-3/4"
      >
        <CarouselContent>
          {testimonials.length > 0 &&
            testimonials.map((item, index) => (
              <CarouselItem
                className="flex justify-center items-center"
                key={index}
              >
                <ReviewCard
                  reviewerName={item.customer_name}
                  starQuantity={item.rating}
                  reviewComment={item.comment}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      <ReviewPopOver onPostSuccess={fetchData} />
    </main>
  );
};

export default Review;
