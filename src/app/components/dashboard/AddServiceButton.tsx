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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

interface Props {
  onPush: () => void;
}
const serviceSchema = z.object({
  service_name: z.string().min(1, "Service name is required"),
});

const AddServiceButton: React.FC<Props> = ({ onPush }) => {
  const [serviceName, setServiceName] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const formData = {
      service_name: serviceName,
    };

    const validationResult = serviceSchema.safeParse(formData);

    if (!validationResult.success) {
      toast({
        variant: "destructive",
        title: "Failed Submission",
        description: "Not valid input",
      });
      return;
    }

    try {
      const response = await fetch("/api/createService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_name: serviceName }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: "Service added successfully",
      });

      setServiceName("");
      onPush();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed Submission",
        description: String(error.message),
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="">
          <Button
            variant="outline"
            className="place-self-end text-white bg-slate-500 border-black border"
          >
            Add Service
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            New Service Form Submission
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Label htmlFor="service">Service Name</Label>
          <Input
            id="service"
            value={serviceName}
            className="col-span-2 h-8 text-black"
            onChange={(e) => setServiceName(e.target.value)}
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-400">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddServiceButton;
