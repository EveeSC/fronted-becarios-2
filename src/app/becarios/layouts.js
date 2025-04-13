'use client';
import Navbar from '@/components/Navbar';

export default function BecariosLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}