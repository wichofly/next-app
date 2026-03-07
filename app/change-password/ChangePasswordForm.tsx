'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdatePasswordForm } from '../api/schema';

type ChangePasswordResponse = {
  error?: string;
  message?: string;
};

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordForm>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ChangePasswordResponse = await response.json();

      if (!response.ok) {
        setError(result.error || 'Unable to update password.');
        return;
      }

      setSuccessMessage(result.message || 'Password updated successfully.');
      reset();
    } catch {
      setError('Unexpected error occurred while updating password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 border border-gray-300 p-4 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label className="form-control w-full">
          <span className="label-text mb-2">Current Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Current password"
            {...register('currentPassword', {
              required: 'Current password is required',
              minLength: {
                value: 5,
                message: 'Current password must be at least 5 characters',
              },
            })}
          />
          {errors.currentPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </label>
      </div>

      <div className="mb-4">
        <label className="form-control w-full">
          <span className="label-text mb-2">New Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Minimum 5 characters"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 5,
                message: 'New password must be at least 5 characters',
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </label>
      </div>

      <div className="mb-4">
        <label className="form-control w-full">
          <span className="label-text mb-2">Confirm New Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Re-enter new password"
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) =>
                value === watch('newPassword') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
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
        {isLoading ? 'Updating password...' : 'Update Password'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
