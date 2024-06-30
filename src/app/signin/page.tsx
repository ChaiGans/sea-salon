"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import githubIcon from "../../../public/github.png";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const SignIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    try {
      loginSchema.parse({ email, password });
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: signInResult?.error,
        });
      } else {
        toast({
          title: "Login Success",
          description: "Welcome back!",
        });
        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({
          email:
            error.errors.find((e) => e.path.includes("email"))?.message || "",
          password:
            error.errors.find((e) => e.path.includes("password"))?.message ||
            "",
        });
      }

      if (errors.password.length !== 0 || errors.email.length !== 0) {
        toast({
          variant: "destructive",
          title: "Login Failed, Wrong Credentials",
        });
      }
    }
  };

  return (
    <form
      className="flex items-center justify-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <div className="w-3/4 bg-slate-800 flex flex-col items-center justify-between pt-14 pb-20 rounded-xl">
        <label className="text-2xl font-poppinsbold">Login</label>
        <div className="px-3 flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            type="email"
            className={`col-span-2 h-8 text-black `}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            className={`col-span-2 h-8 text-black `}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <label>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-500 underline underline-offset-2"
            >
              Sign up.
            </Link>
          </label>
        </div>
        <Button
          variant={"outline"}
          className="text-black w-1/2 mt-8"
          type="submit"
        >
          Login
        </Button>
        {/* <hr className="text-gray-400 mt-4 w-3/4 mb-4" />
        <div className="w-full flex justify-center">
          <Button
            variant={"outline"}
            onClick={() => signIn("github")}
            className="text-black"
          >
            Sign in with Github
            <Image
              src={githubIcon}
              alt="Github icon"
              width={20}
              height={20}
              className="ml-3"
            ></Image>
          </Button>
        </div> */}
      </div>
    </form>
  );
};

export default SignIn;
