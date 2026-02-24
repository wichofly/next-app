import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      <Link href="/api/auth/signin">Sign In</Link>
    </div>
  );
};

export default Navbar;
