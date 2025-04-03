import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInterviewSession } from '../hooks/useInterviewSession';
import { InterviewContainer } from '../containers/InterviewContainer';
import { LoadingOverlay, ErrorDisplay } from '../components';

const InterviewQuestionPage = () => {
  const { setTitle } = useOutletContext();
  const sessionId = sessionStorage.getItem('sessionID');
  const { session, isLoading, error } = useInterviewSession(sessionId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    setTitle('Practice Interview');
  }, []);

  if (isLoading) return <LoadingOverlay />;
  if (error) return <ErrorDisplay message={error} />;
  if (!session?.questions?.length) return <NoQuestionsAvailable />;

  return (
    <InterviewContainer 
      session={session} 
      currentQuestionIndex={currentQuestionIndex}
      onQuestionChange={setCurrentQuestionIndex}
    />
  );
};

export default InterviewQuestionPage;