"use client";
import React from "react";
import { SidebarNav } from "@/components/SidebarNav";
import LogoStateStreet from "@/assets/logos/Logo_State_Street.svg";
import LogoAlta from "@/assets/logos/Logo_Alta.svg";
import LogoGS from "@/assets/logos/Logo_GS.svg";

const organizations = [
  {
    id: "alta-capital",
    name: "Alta Capital",
    logo: LogoAlta,
    avatarUrl: "/avatars/tydavidson.png",
    avatarFallback: "AC"
  },
  {
    id: "state-street",
    name: "State Street",
    logo: LogoStateStreet,
    avatarUrl: "/avatars/tydavidson.png",
    avatarFallback: "SS"
  },
  {
    id: "gs",
    name: "Goldman Sachs",
    logo: LogoGS,
    avatarUrl: "/avatars/tydavidson.png",
    avatarFallback: "GS"
  }
];

export default function SidebarNavClient() {
  const [currentOrg, setCurrentOrg] = React.useState(organizations[0].id);
  return (
    <SidebarNav
      organizations={organizations}
      currentOrg={currentOrg}
      setCurrentOrg={setCurrentOrg}
    />
  );
} 