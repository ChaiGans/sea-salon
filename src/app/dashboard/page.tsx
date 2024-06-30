"use client";

import BranchCard from "../components/dashboard/BranchCard";
import AddBranchButton from "../components/dashboard/AddBranchButton";
import { useState, useEffect } from "react";

interface Branch {
  branch_name: string;
  branch_location: string;
  open_time: string;
  close_time: string;
  services: any;
}

export interface ServiceBranchRelation {
  branchId: Number;
  minutes: Number;
  serviceId: Number;
}

export interface Service {
  id: Number;
  service_name: string;
}

export const Dashboard = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchData = async () => {
    function extractTimeFromISO(isoString: string) {
      if (!isoString) return "N/A";

      const date = new Date(isoString);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    }

    try {
      const response = await fetch("/api/getBranch");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json.branches);
      const formattedBranches = json.branches.map((branch: any) => ({
        ...branch,
        open_time: extractTimeFromISO(branch.opening_time),
        close_time: extractTimeFromISO(branch.closing_time),
      }));
      console.log(formattedBranches);
      setBranches(formattedBranches);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="py-4 px-4">
      <header className="w-full justify-between flex">
        <AddBranchButton onPost={fetchData} />
      </header>
      <h1 className="font-poppinsbold text-xl mt-4">Current active branches</h1>
      <div className="space-y-2">
        {branches.map((item, index) => {
          return (
            <>
              <BranchCard
                branchName={item.branch_name}
                branchLocation={item.branch_location}
                branchOpenTime={item.open_time}
                branchCloseTime={item.close_time}
                branchServices={item.services}
                key={index}
              />
            </>
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;
