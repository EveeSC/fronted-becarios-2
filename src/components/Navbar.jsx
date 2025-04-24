import React from 'react';
import NotificationsPopover from './NotificationsModal';
import { BellIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-end">
          <NotificationsPopover />
          <span className="text-sm font-medium text-gray-700">Usuario</span>
        </div>
      </div>
    </nav>
  );
}