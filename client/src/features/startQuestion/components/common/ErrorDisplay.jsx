import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorDisplay({ message = 'An error occurred', onRetry, retryText = 'Try again' }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
      <div className="flex items-start">
        <FaExclamationTriangle className="flex-shrink-0 h-5 w-5 text-red-500 dark:text-red-400 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {message}
          </h3>
          {onRetry && (
            <div className="mt-2">
              <button
                onClick={onRetry}
                className="text-sm text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-200 font-medium underline"
              >
                {retryText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}