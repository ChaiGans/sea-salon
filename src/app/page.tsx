import Hero from "./components/home/Hero";
import Review from "./components/home/Review";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center text-center items-center">
      <Hero />
      <Review />
    </main>
  );
}
