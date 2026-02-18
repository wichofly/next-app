import Link from 'next/link';
import { Suspense } from 'react';
import UserTable from './UserTable';

interface UserPageProps {
  searchParams: Promise<{ sortOrder?: string }>;
}

const UsersPage = async ({ searchParams }: UserPageProps) => {
  const { sortOrder } = await searchParams;

  return (
    <>
      <h1>Users</h1>
      <p className="mb-2">Time: {new Date().toLocaleTimeString()}</p>
      <Link href="/users/new" className="btn btn-soft btn-secondary mb-2">
        Add new user
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
