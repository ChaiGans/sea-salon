import { Button } from "@/components/ui/button";

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
      <Button variant="destructive" className="mt-4">
        Reserve now
      </Button>
      <label className="mt-4 font-poppinsregular text-xs text-center">
        Haircuts and Styling | Manicure and Predicure | Facial Treatments
      </label>
    </header>
  );
};

export default Hero;
