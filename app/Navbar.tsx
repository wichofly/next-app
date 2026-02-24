'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return null;

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      
      {status === 'authenticated' ? (
        <Link
          href="/api/auth/signout"
          className="hover:text-pink-600 transition-colors font-semibold"
        >
          {session.user!.name}
        </Link>
      ) : (
        <Link
          href="/api/auth/signin"
          className="hover:text-emerald-600 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
