"use client";

import { useState, useEffect } from "react";
import ReservationCard from "./ReservationCard";
import { useToast } from "@/components/ui/use-toast";

interface PastReservationProps {
  reservations: any[]; // Define the type based on your data structure
  onFetchReservation: () => void;
}
const PastReservation: React.FC<PastReservationProps> = ({
  reservations,
  onFetchReservation,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    onFetchReservation();
  }, []);

  function extractGMT7Hours(dateString: string) {
    const utcDate = new Date(dateString);
    const utcHours = utcDate.getHours(); // Extract hours in UTC
    const utcMinutes = utcDate.getMinutes();
    const gmt7Hours = (utcHours - 7 + 24) % 24; // Adjust UTC to GMT+7 and wrap around using modulo

    // Pad the hour and minute values to ensure they are always two digits
    const formattedHours = String(gmt7Hours).padStart(2, "0");
    const formattedMinutes = String(utcMinutes).padStart(2, "0");

    return formattedHours + ":" + formattedMinutes; // Combine the padded values into a time string
  }

  return (
    <main>
      <h1 className="font-poppinsbold text-xl mt-4">Past Reservation</h1>
      {reservations ? (
        <div className="flex flex-col space-y-2">
          {reservations.map((reservation: any, index: number) => {
            return (
              <ReservationCard
                key={index}
                branchName={reservation.serviceOnBranch.Branch.branch_name}
                branchLocation={
                  reservation.serviceOnBranch.Branch.branch_location
                }
                startTime={extractGMT7Hours(reservation.time)}
                serviceName={reservation.serviceOnBranch.Service.service_name}
                sessionLong={reservation.serviceOnBranch.minutes}
              />
            );
          })}
        </div>
      ) : (
        "No reservation made."
      )}

      <div></div>
    </main>
  );
};

export default PastReservation;
