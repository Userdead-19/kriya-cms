"use client";
import { useState } from "react";
import { EventSearch } from "./components/eventSearch";
import { WorkshopSearch } from "./components/WorkshopSearch";

export default function Home() {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="container mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex justify-between">
        <h1 className="text-xl font-bold">Event Management System</h1>
        <ul className="flex space-x-4">
          <li>
            <button
              className={`px-3 py-1 rounded ${
                activeTab === "events" ? "bg-white text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-1 rounded ${
                activeTab === "workshops" ? "bg-white text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("workshops")}
            >
              Workshops
            </button>
          </li>
          <li>
            <button
              className={`px-3 py-1 rounded ${
                activeTab === "papers" ? "bg-white text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("papers")}
            >
              Paper Presentation
            </button>
          </li>
        </ul>
      </nav>

      {/* Dynamic Sections */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
        {activeTab === "events" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Events</h2>
            <p className="mb-2">Search for events by ID or name.</p>
            <EventSearch />
          </>
        )}

        {activeTab === "workshops" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Workshops</h2>
            <p className="mb-2">Find workshops and register.</p>
            <WorkshopSearch />
          </>
        )}

        {activeTab === "papers" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Paper Presentation</h2>
            <p className="mb-2">Search for submitted papers and details.</p>
            <EventSearch />
          </>
        )}
      </div>
    </div>
  );
}
