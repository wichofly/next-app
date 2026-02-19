import { notFound } from 'next/navigation';

interface UserDetailPageProps {
  params: Promise<{ id: number }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { id } = await params;

  if (id > 10) notFound();

  return <div>UserDetailPage: {id}</div>;
};

export default UserDetailPage;
