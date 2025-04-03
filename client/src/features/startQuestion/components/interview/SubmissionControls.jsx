export const SubmissionControls = ({ 
    isSubmitting, 
    isLastQuestion, 
    onSubmit 
  }) => (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 ${
          isSubmitting ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 
         isLastQuestion ? 'Finish Interview' : 'Next Question'}
      </button>
    </div>
  );