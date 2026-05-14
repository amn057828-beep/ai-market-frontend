'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaChartLine, FaBell, FaWallet, FaStar } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaHome /> },
    { name: 'Universal Search', href: '/universal-search', icon: <FaChartLine /> },
    { name: 'Market Scanner', href: '/market-scanner', icon: <FaChartLine /> },
    { name: 'Watchlist', href: '/watchlist', icon: <FaStar /> },
    { name: 'Alerts', href: '/alerts', icon: <FaBell /> },
    { name: 'Portfolio', href: '/portfolio', icon: <FaWallet /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">AI Market</div>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${
                pathname === link.href ? 'bg-gray-800 font-bold' : ''
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}