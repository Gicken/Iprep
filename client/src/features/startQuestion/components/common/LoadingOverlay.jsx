import { FaSpinner } from 'react-icons/fa';

export default function LoadingOverlay({ message = 'Loading...', show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-3xl text-blue-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {message}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please wait while we process your request
          </p>
        </div>
      </div>
    </div>
  );
}