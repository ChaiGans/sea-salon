import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <header className="flex flex-col justify-center items-center text-white text-center min-h-screen p-4">
      <label className="text-4xl text-center font-poppinslight">
        Beauty and Elegance Redefined
      </label>
      <p className="text-xs font-poppinslight mt-2">
        SEA Salon, where beauty and elegance are redefined, offers a luxurious
        and welcoming environment for all your beauty needs. Our top-notch
        services include exquisite haircuts and styling, revitalizing manicures
        and pedicures, and rejuvenating facial treatments. At SEA Salon, we are
        dedicated to enhancing your natural beauty with our skilled
        professionals and premium products. Whether you are preparing for a
        special occasion or simply seeking a moment of relaxation, SEA Salon is
        your go-to destination for an unparalleled beauty experience.
      </p>

      <Link href="/reservations">
        <Button variant="destructive" className="mt-4">
          Reserve now
        </Button>
      </Link>

      <label className="mt-4 font-poppinsregular text-xs text-center">
        Haircuts and Styling | Manicure and Predicure | Facial Treatments
      </label>
      <div className="flex flex-col space-y-1 justify-center items-center mt-12">
        <div className="flex flex-row space-x-2 font-poppinslight text-xs">
          <FaPhoneAlt className="mt-1" /> <label>08123456789 (Thomas)</label>
        </div>
        <div className="flex flex-row space-x-2 font-poppinslight text-xs">
          <FaPhoneAlt className="mt-1" /> <label>08164829372 (Sekar)</label>
        </div>
      </div>
    </header>
  );
};

export default Hero;
