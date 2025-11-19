'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <div 
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: 'url(/images/backdrop.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay to reduce contrast and make backdrop more subtle */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

