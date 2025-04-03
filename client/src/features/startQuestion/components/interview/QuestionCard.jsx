export const QuestionCard = ({ question, index }) => (
    <div className="bg-gray-800 p-6 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">
        Question {index + 1}: {question.question_text}
      </h2>
    </div>
  );