"use client"
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  useEffect(() => {
    // Prevent server-side rendering issues with Leaflet and window object
  }, []);

  return (
    <div>
      <Map />
    </div>
  );
}
