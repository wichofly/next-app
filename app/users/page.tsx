import UserTable from './UserTable';

interface UserPageProps {
  searchParams: Promise<{ sortOrder?: string }>;
}

const UsersPage = async ({ searchParams }: UserPageProps) => {
  const { sortOrder } = await searchParams;

  return (
    <>
      <h1>Users</h1>
      <p>Time: {new Date().toLocaleTimeString()}</p>

      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default UsersPage;
