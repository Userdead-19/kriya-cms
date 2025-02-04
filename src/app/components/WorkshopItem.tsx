"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { Label } from "@/components/ui/label";
import type { Workshop } from "../types/workshop";

export function WorkshopItem({ workshopId }: { workshopId: any }) {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkshop();
  }, []);

  const fetchWorkshop = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://kriyabackend.psgtech.ac.in/api/cms/workshops/${workshopId}`
      );

      const data = response.data;
      setWorkshop(data);
      setError(null);
    } catch (err) {
      setError("Error fetching workshop");
      setWorkshop(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkshop((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setWorkshop((prev) => (prev ? { ...prev, [name]: checked } : null));
    console.log(workshop);
  };

  const handleUpdate = async () => {
    if (workshop) {
      try {
        const response = await axios.put(
          `https://kriyabackend.psgtech.ac.in/api/cms/workshops/${workshopId}`,
          workshop
        );

        const updatedEvent = response.data;
        setWorkshop(updatedEvent);
        setWorkshop(updatedEvent);
        setEditing(false);
        setError(null);
      } catch (err) {
        setError("Error updating workshop");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!workshop) return <div>No workshop found</div>;

  const renderField = (
    name: string,
    label: string,
    component: React.ReactNode
  ) => (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </Label>
      {component}
    </div>
  );

  if (editing) {
    return (
      <div className="border p-4 mb-4 rounded-md space-y-4">
        {renderField(
          "wid",
          "Workshop ID",
          <Input
            id="wid"
            name="wid"
            value={workshop.wid}
            onChange={handleInputChange}
            readOnly
          />
        )}
        {renderField(
          "workName",
          "Workshop Name",
          <Input
            id="workName"
            name="workName"
            value={workshop.workName}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "assnName",
          "Association Name",
          <Input
            id="assnName"
            name="assnName"
            value={workshop.assnName}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "image",
          "Image URL",
          <Input
            id="image"
            name="image"
            value={workshop.image}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "alteredFee",
          "Altered Fee",
          <Input
            id="alteredFee"
            name="alteredFee"
            type="number"
            value={workshop.alteredFee}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "actualFee",
          "Actual Fee",
          <Input
            id="actualFee"
            name="actualFee"
            type="number"
            value={workshop.actualFee}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "date",
          "Date",
          <Input
            id="date"
            name="date"
            value={workshop.date}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "hall",
          "Hall",
          <Input
            id="hall"
            name="hall"
            value={workshop.hall}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "time",
          "Time",
          <Input
            id="time"
            name="time"
            value={workshop.time}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "c1Name",
          "Contact 1 Name",
          <Input
            id="c1Name"
            name="c1Name"
            value={workshop.c1Name}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "c1Num",
          "Contact 1 Number",
          <Input
            id="c1Num"
            name="c1Num"
            value={workshop.c1Num}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "c2Name",
          "Contact 2 Name",
          <Input
            id="c2Name"
            name="c2Name"
            value={workshop.c2Name}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "c2Num",
          "Contact 2 Number",
          <Input
            id="c2Num"
            name="c2Num"
            value={workshop.c2Num}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "maxCount",
          "Max Participants",
          <Input
            id="maxCount"
            name="maxCount"
            value={workshop.maxCount}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "desc",
          "Description",
          <Textarea
            id="desc"
            name="desc"
            value={workshop.desc}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "prerequisites",
          "Prerequisites",
          <Textarea
            id="prerequisites"
            name="prerequisites"
            value={workshop.prerequisites}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "closed",
          "Closed",
          <div className="flex items-center space-x-2">
            <Checkbox
              id="closed"
              checked={workshop.closed}
              onCheckedChange={handleCheckboxChange("closed")}
            />
            <label htmlFor="closed">Workshop is closed</label>
          </div>
        )}
        {renderField(
          "earlyBirdActive",
          "Early Bird Active",
          <div className="flex items-center space-x-2">
            <Checkbox
              id="earlyBirdActive"
              checked={workshop.earlyBirdActive}
              onCheckedChange={handleCheckboxChange("earlyBirdActive")}
            />
            <label htmlFor="earlyBirdActive">
              Early bird registration is active
            </label>
          </div>
        )}
        <div className="flex space-x-2">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-4 mb-4 rounded-md space-y-4">
      <img
        src={workshop.image || "/placeholder.svg"}
        alt={workshop.workName}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-2xl font-bold">{workshop.workName}</h2>
      <div>
        <strong>Workshop ID:</strong> {workshop.wid}
      </div>
      <div>
        <strong>Association Name:</strong> {workshop.assnName}
      </div>
      <div>
        <strong>Altered Fee:</strong> ₹{workshop.alteredFee}
      </div>
      <div>
        <strong>Actual Fee:</strong> ₹{workshop.actualFee}
      </div>
      <div>
        <strong>Date:</strong> {workshop.date}
      </div>
      <div>
        <strong>Hall:</strong> {workshop.hall}
      </div>
      <div>
        <strong>Time:</strong> {workshop.time}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p>
          <strong>Contact 1:</strong> {workshop.c1Name} - {workshop.c1Num}
        </p>
        <p>
          <strong>Contact 2:</strong> {workshop.c2Name} - {workshop.c2Num}
        </p>
      </div>
      <div>
        <strong>Max Participants:</strong> {workshop.maxCount}
      </div>
      <div>
        <strong>Description:</strong> {workshop.desc}
      </div>
      <div>
        <strong>Prerequisites:</strong> {workshop.prerequisites}
      </div>
      <div>
        <strong>Status:</strong> {workshop.closed ? "Closed" : "Open"}
      </div>
      <div>
        <strong>Early Bird:</strong>{" "}
        {workshop.earlyBirdActive ? "Active" : "Inactive"}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Agenda</h3>
        {workshop.agenda.map((session, index) => (
          <div key={index}>
            {session.map((item, itemIndex) => (
              <div key={itemIndex}>
                <p>
                  <strong>{item.time}</strong>
                </p>
                <ul>
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={() => setEditing(true)}>Edit</Button>
    </div>
  );
}
