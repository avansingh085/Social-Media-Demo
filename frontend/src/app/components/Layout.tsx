// app/components/Layout.tsx  (or /src/components/Layout.tsx)

import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} My App
      </footer>
    </div>
  );
}
