import React from "react";
import { useCV } from "../hooks/useCV";
import { useOutletContext } from "react-router-dom";

function InterviewPage() {
  const { setTitle } = useOutletContext();
  const { cv } = useCV();

  React.useEffect(() => {
    setTitle("Start Interview");
  }, [setTitle]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
          <button
            className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => console.log("CV Data:", cv)}
          >
            Begin Interview!
          </button>
        </div>
      </div>
    </>
  );
}

export default InterviewPage;
