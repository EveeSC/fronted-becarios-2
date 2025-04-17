'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BecariosLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}