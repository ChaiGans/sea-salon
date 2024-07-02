"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import PastReservation from "../components/reservation/PastReservations";

interface AvailableTimeType {
  label: string;
  value: string;
}
interface Props {
  customerId: number;
}
const Reserve: React.FC<Props> = () => {
  const [reservations, setReservations] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTime, setAvailableTime] = useState<AvailableTimeType[]>([]);
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("/api/getBranch");
        if (!response.ok) throw new Error("Failed to fetch branches.");
        const data = await response.json();
        setBranches(data.branches);
      } catch (error) {
        toast({ title: "Error fetching branches.", variant: "destructive" });
      }
    };

    fetchBranches();
  }, []);

  const fetchReservations = async () => {
    const url = new URL("/api/getReservation", window.location.origin);
    url.searchParams.append("customerId", session?.user?.id);
    try {
      const response = await fetch(url.href);
      if (!response.ok) throw new Error("Failed to fetch reservations.");
      const data = await response.json();
      setReservations(data.reservations); // Setting the state here
    } catch (error) {
      toast({
        title: "Error fetching reservations.",
        variant: "destructive",
      });
    }
  };

  function generateTimeSlots(data: any, selectedService: any) {
    function extractGMT7Hours(dateString: string) {
      const utcDate = new Date(dateString);
      const utcHours = utcDate.getHours(); // Extract hours in UTC
      const gmt7Hours = (utcHours - 7 + 24) % 24;
      return gmt7Hours;
    }

    function formatTime(hour: number, minute: number) {
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    }

    const openingTime = extractGMT7Hours(data.opening_time);
    const closingTime = extractGMT7Hours(data.closing_time);

    const sessionDuration = selectedService.minutes; // Duration of each session in minutes
    let timeChoices = [];

    for (let hour = openingTime; hour < closingTime; hour++) {
      for (let minute = 0; minute < 60; minute += sessionDuration) {
        const startTime = formatTime(hour, minute);
        const endTimeHour = hour + Math.floor((minute + sessionDuration) / 60);
        const endTimeMinute = (minute + sessionDuration) % 60;

        // Check if the calculated end time hour exceeds the closing time
        if (
          endTimeHour > closingTime ||
          (endTimeHour === closingTime && endTimeMinute > 0)
        ) {
          break; // Stop adding slots if end time goes beyond closing time
        }

        const endTime = formatTime(endTimeHour, endTimeMinute);
        timeChoices.push({
          label: `${startTime}-${endTime}`,
          value: startTime,
        });
      }
    }

    return timeChoices;
  }

  const handleReserve = async () => {
    if (!selectedBranch || !selectedService || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Branch Creation Failed",
        description: "Please select all required fields.",
      });
      return;
    }

    try {
      const response = await fetch("/api/createReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: Number(session?.user?.id),
          serviceOnBranchId: selectedService.id,
          time: selectedTime.value,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reserve.");

      toast({
        title: "Reservation Creation Success",
      });

      fetchReservations();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Branch Creation Failed",
        description: error.message,
      });
    }
  };

  const handleBranchChange = (value: any) => {
    setSelectedBranch(value);
    setSelectedService(null);
    setSelectedTime(null);
  };

  const handleServiceChange = (value: any) => {
    setSelectedService(value);
    setSelectedTime(null);
    // console.log(selectedBranch);

    setAvailableTime(generateTimeSlots(selectedBranch, value));
  };

  const handleTimeChange = (value: any) => {
    setSelectedTime(value);
  };

  return (
    <main className="py-4 px-4">
      <PastReservation
        reservations={reservations}
        onFetchReservation={fetchReservations}
      />
      <h1 className="font-poppinsbold text-xl mt-4">Reservation form</h1>
      <Label htmlFor="branch-name">Branch Name</Label>
      <Select onValueChange={handleBranchChange}>
        <SelectTrigger id="branch-name" className="text-black">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem key={branch.id} value={branch} className="text-black">
              {branch.branch_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedBranch && (
        <>
          <Label htmlFor="service-type">Service type</Label>
          <Select onValueChange={handleServiceChange}>
            <SelectTrigger id="service-type" className="text-black">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {selectedBranch.services.map((service: any) => (
                <SelectItem
                  key={service.id}
                  value={service}
                  className="text-black"
                >
                  {service.Service.service_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
      {selectedService && (
        <>
          <Label htmlFor="time-slot">Time slots</Label>
          <Select onValueChange={handleTimeChange}>
            <SelectTrigger id="time-slot" className="text-black">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableTime.map((time: any, index: number) => (
                <SelectItem key={index} value={time} className="text-black">
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
      {selectedTime && (
        <>
          <Button
            onClick={handleReserve}
            variant={"destructive"}
            className="mt-6"
          >
            Submit Reservation
          </Button>
        </>
      )}
    </main>
  );
};

export default Reserve;
