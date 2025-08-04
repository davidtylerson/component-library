'use client';
import React from 'react';
import { SidebarNav } from './SidebarNav';

const organizations = [
  {
    id: 'alta-capital',
    name: 'Alta Capital',
    logo: () => <span className="text-xs font-bold">AC</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'AC',
  },
  {
    id: 'state-street',
    name: 'State Street',
    logo: () => <span className="text-xs font-bold">SS</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'SS',
  },
  {
    id: 'gs',
    name: 'Goldman Sachs',
    logo: () => <span className="text-xs font-bold">GS</span>,
    avatarUrl: '/avatars/tydavidson.png',
    avatarFallback: 'GS',
  },
];

export default function SidebarNavClient() {
  return (
    <SidebarNav
      organizations={organizations}
    />
  );
}
