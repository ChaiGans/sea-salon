import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-white font-poppinsbold">Ini poppins bold</p>
      <p className="text-white font-poppinssb">Ini poppins semibold</p>
      <p className="text-white">Ini b aja</p>
    </main>
  );
}
