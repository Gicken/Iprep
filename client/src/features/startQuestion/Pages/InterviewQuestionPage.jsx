import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInterviewSession } from '../hooks/useInterviewSession';
import { InterviewContainer } from '../containers/InterviewContainer';
import { LoadingOverlay, ErrorDisplay } from '../components';

const InterviewQuestionPage = () => {
  const { setTitle } = useOutletContext();
  const sessionId = sessionStorage.getItem('sessionID');
  const { session, isLoading, error } = useInterviewSession(sessionId);

  useEffect(() => {
    setTitle('Practice Interview');
  }, [setTitle]);

  if (isLoading) return <LoadingOverlay />;
  if (error) return <ErrorDisplay message={error} />;
  if (!session?.questions?.length) return <NoQuestionsAvailable />;

  return (
    <InterviewContainer  
      sessionId = {sessionId}
    />
  );
};

export default InterviewQuestionPage;