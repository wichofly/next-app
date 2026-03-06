'use client';

import { useState, SubmitEvent } from 'react';
import Link from 'next/link';

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  error?: string;
};

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: RegisterResponse = await response.json();

      if (!response.ok) {
        setError(result.error || 'Unable to register user.');
        return;
      }

      setSuccessMessage('Account created successfully. You can now log in.');
      setFormData({ name: '', email: '', password: '' });
    } catch {
      setError('Unexpected error occurred while registering.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h1>Create Account</h1>
      <p className="mb-6 text-sm text-gray-600">
        Register with your name, email, and password.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="form-control w-full">
          <span className="label-text mb-1">Name</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="John Doe"
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Email</span>
          <input
            type="email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="john@example.com"
            required
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            placeholder="Minimum 5 characters"
            minLength={5}
            required
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-700">{successMessage}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full mt-3"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/api/auth/signin" className="link link-hover">
          Sign in
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
