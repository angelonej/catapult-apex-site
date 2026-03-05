import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-primary-700 mb-2">
          {label}
        </label>
      }
      <input
        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent ${error ? 'border-red-500 focus:ring-red-500' : 'border-primary-200 hover:border-primary-300'} ${className}`}
        {...props} />

      {error &&
      <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      }
    </div>);

}