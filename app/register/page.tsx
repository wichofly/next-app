'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormState>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormState> = async (data) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: RegisterResponse = await response.json();

      if (!response.ok) {
        setError(result.error || 'Unable to register user.');
        return;
      }

      setSuccessMessage('Account created successfully. You can now log in.');
      reset();
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

      <form
        className="space-y-4 border border-gray-300 p-4 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="form-control w-full">
            <span className="label-text mb-2">Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-control w-full">
            <span className="label-text mb-2">Email</span>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Minimum 5 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password must be at least 5 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

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
