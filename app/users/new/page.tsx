'use client';
import { useRouter } from 'next/navigation';

const NewPage = () => {
  const router = useRouter();

  return (
    <button
      className="btn btn-outline btn-primary"
      onClick={() => router.push('/users')}
    >
      Create
    </button>
  );
};

export default NewPage;
