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
import { useToast } from "@/components/ui/use-toast";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const Review = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([
    {
      name: "Jane Doe",
      rating: 5,
      comment:
        "SEA Salon offers the best haircut experience! The staff is friendly and professional. Highly recommend!",
    },
    {
      name: "John Smith",
      rating: 5,
      comment:
        "I had an amazing manicure and pedicure session. The atmosphere is so relaxing, and the service is top-notch!",
    },
    {
      name: "Emily Johnson",
      rating: 5,
      comment:
        "The facial treatments at SEA Salon are fantastic. My skin feels rejuvenated and glowing. Will definitely come back!",
    },
  ]);

  const { toast } = useToast();

  useEffect(() => {
    if (testimonials.length > 3) {
      toast({
        title: "Review updated",
        description: "Thanks for the review. Love you. -SEA Salon-",
      });
    }
  }, [testimonials]);

  const addReview = (review: Review) => {
    setTestimonials((prevReviews) => [...prevReviews, review]);
  };

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
          {testimonials.map((item, index) => (
            <CarouselItem
              className="flex justify-center items-center"
              key={index}
            >
              <ReviewCard
                reviewerName={item.name}
                starQuantity={item.rating}
                reviewComment={item.comment}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <ReviewPopOver addReview={addReview} />
    </main>
  );
};

export default Review;
