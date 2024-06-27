"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Client-side validation schema
const clientUserSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be valid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = clientUserSchema.safeParse({
      fullName: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });

    if (!result.success) {
      setError(result.error.issues.map((issue) => issue.message).join(", "));
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error,
      });
      return;
    }

    // API request to the server
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone_number: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Handle success
      toast({
        title: "Registration Success",
        description: "Your account registration succeeded",
      });

      router.push("/signin");
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form
        className="w-3/4 bg-slate-800 flex flex-col items-center justify-between pt-14 pb-20 rounded-xl"
        onSubmit={handleSubmit}
      >
        <label className="text-2xl font-poppinsbold">Register</label>
        <div className="px-3 flex flex-col space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            className="col-span-2 h-8 text-black"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            type="email"
            className="col-span-2 h-8 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            value={phoneNumber}
            className="col-span-2 h-8 text-black"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            type="password"
            className="col-span-2 h-8 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant={"outline"}
          className="text-black w-1/2 mt-8"
        >
          Register
        </Button>
      </form>
    </main>
  );
};

export default SignUp;
