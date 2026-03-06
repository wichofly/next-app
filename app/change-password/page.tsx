import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/change-password');
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h1>Change Password</h1>
      <p className="mb-6 text-sm text-gray-600">
        Update your password by confirming your current one.
      </p>

      <ChangePasswordForm />
    </main>
  );
};

export default ChangePasswordPage;
