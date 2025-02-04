"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WorkshopSearch() {
  const [workshopId, setWorkshopId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/workshop/${workshopId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={workshopId}
        onChange={(e) => setWorkshopId(e.target.value)}
        placeholder="Enter Workshop ID (e.g., WKSP03)"
        className="w-full"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
