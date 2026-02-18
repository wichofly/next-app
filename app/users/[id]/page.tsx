interface UserDetailPageProps {
  params: { id: number };
}

const UserDetailPage = ({ params }: UserDetailPageProps) => {
  const { id } = params;

  return <div>UserDetailPage: {id}</div>;
};

export default UserDetailPage;
