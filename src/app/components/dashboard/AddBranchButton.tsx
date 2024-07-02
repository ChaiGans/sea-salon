import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import TimePicker from "react-time-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import AddServiceButton from "./AddServiceButton";
import { z } from "zod";

const serviceSchema = z.object({
  serviceId: z.number(),
  minutes: z.number().min(1, "Minutes should be at least 1"),
});

const branchSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  branchLocation: z.string().min(1, "Branch location is required"),
  openTime: z.string().min(1, "Opening time is required"),
  closeTime: z.string().min(1, "Closing time is required"),
  services: z.array(serviceSchema).min(1, "At least one service is required"),
});

interface Props {
  onPost: () => void;
}

interface Service {
  id: number;
  service_name: string;
  minutes?: number;
}

const AddBranchButton: React.FC<Props> = ({ onPost }) => {
  const [branchName, setBranchName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("21:00");
  const [choosenService, setChoosenService] = useState<Service[]>([]);
  const [serviceOption, setServiceOption] = useState<Service[]>([]);
  const { toast } = useToast();

  const fetchServicesData = async () => {
    try {
      const response = await fetch("/api/getService");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setServiceOption(json.services);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleCheckboxChange = (service: Service) => {
    setChoosenService((prevSelectedServices) => {
      if (prevSelectedServices.find((s) => s.id === service.id)) {
        // If the service is already selected, remove it from the selected services
        return prevSelectedServices.filter((s) => s.id !== service.id);
      } else {
        // If the service is not selected, add it to the selected services with default minutes
        return [...prevSelectedServices, { ...service, minutes: 0 }];
      }
    });
  };

  const handleMinutesChange = (serviceId: number, minutes: number) => {
    setChoosenService((prevSelectedServices) =>
      prevSelectedServices.map((service) =>
        service.id === serviceId ? { ...service, minutes } : service
      )
    );
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const handleSubmit = async () => {
    const formData = {
      branchName,
      branchLocation,
      openTime,
      closeTime,
      services: choosenService.map((service) => ({
        serviceId: service.id,
        minutes: service.minutes ?? 0,
      })),
    };

    const validationResult = branchSchema.safeParse(formData);

    if (!validationResult.success) {
      toast({
        variant: "destructive",
        title: "Failed Submission",
        description: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
      });
      return;
    }

    try {
      const response = await fetch("/api/createBranch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branch_name: branchName,
          branch_location: branchLocation,
          opening_time: openTime,
          closing_time: closeTime,
          services: choosenService,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: "Branch added successfully",
      });

      onPost();

      setBranchName("");
      setBranchLocation("");
      setOpenTime("09:00");
      setCloseTime("21:00");
      setChoosenService([]);
      setServiceOption([]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Branch Creation Failed",
        description: error.message,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full flex justify-between">
          <Button variant="destructive">Add New Branch</Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            New Branch Form Submission
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Label htmlFor="BranchName">Branch Name</Label>
          <Input
            id="BranchName"
            value={branchName}
            className="col-span-2 h-8 text-black"
            onChange={(e) => setBranchName(e.target.value)}
          />
          <Label htmlFor="BranchLocation">Branch Location</Label>
          <Input
            id="BranchLocation"
            value={branchLocation}
            className="col-span-2 h-8 text-black"
            onChange={(e) => setBranchLocation(e.target.value)}
          />
          <Label htmlFor="openingTime">Opening Time</Label>
          <div className="w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            <input
              onChange={(event) => setOpenTime(event.target.value)}
              aria-label="Time"
              type="time"
            />
          </div>

          <Label htmlFor="closeTime">Close Time</Label>
          <div className="w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            <input
              onChange={(event) => setCloseTime(event.target.value)}
              aria-label="Time"
              type="time"
            />
          </div>
          <Label htmlFor="service">Service options</Label>
          <div className="flex flex-col space-y-2 mb-3">
            {serviceOption.map((service) => {
              const selectedService = choosenService.find(
                (s) => s.id === service.id
              );
              return (
                <div className="flex items-center space-x-2" key={service.id}>
                  <Checkbox
                    id={`service-${service.id}`}
                    onCheckedChange={() => handleCheckboxChange(service)}
                    checked={!!selectedService}
                  />
                  <label
                    htmlFor={`service-${service.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {service.service_name}
                  </label>
                  {selectedService && (
                    <>
                      <Input
                        id={`input-${service.id}`}
                        type="number"
                        className="w-16 h-8 text-black"
                        value={selectedService.minutes}
                        onChange={(e) =>
                          handleMinutesChange(
                            service.id,
                            Number(e.target.value)
                          )
                        }
                      />
                      <Label htmlFor={`input-${service.id}`}>minutes</Label>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <AddServiceButton onPush={fetchServicesData} />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-400">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddBranchButton;
