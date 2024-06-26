"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useRef } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Props {
  onPostSuccess: () => void;
}

export const ReviewPopOver: React.FC<Props> = ({ onPostSuccess }) => {
  const [name, setName] = useState("John Doe");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("Cool. Love this place!");
  const { toast } = useToast();

  const popoverCloseRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const reviewName = name.trim() === "" ? "Anonymous" : name;
    const newReview = { name: reviewName, rating: Number(rating), comment };
    // addReview(newReview);

    try {
      const response = await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: name,
          rating,
          comment,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Handle success
      toast({
        title: "Review added successfully",
        description: "Thank you for leaving a review.",
      });

      onPostSuccess();

      setName("John Doe");
      setRating(5);
      setComment("Cool. Love this place!");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      });
    }

    if (popoverCloseRef.current) {
      popoverCloseRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="destructive">Add your review</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mt-2">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Review</h4>
              <p className="text-sm text-muted-foreground">
                Give your honest review.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  className="col-span-2 h-8"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  value={rating}
                  min={1}
                  max={5}
                  className="col-span-2 h-8"
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="comment">Comment</Label>
                <Input
                  id="comment"
                  value={comment}
                  className="col-span-2 h-8"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button
                className={`w-1/2 place-self-center mt-2 ${
                  rating < 1 || rating > 5 ? "cursor-not-allowed" : ""
                }`}
                disabled={rating < 1 || rating > 5 ? true : false}
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </Button>
              <PopoverClose asChild>
                <button ref={popoverCloseRef} className="hidden">
                  Close
                </button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </form>
  );
};
