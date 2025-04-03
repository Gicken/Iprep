import { useState, useEffect } from 'react';
import { interviewApi } from '../api/InterviewApi';

export const useInterviewSession = (sessionId) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await interviewApi.getSession(sessionId);
        setSession(sessionData);
      } catch (err) {
        setError('Failed to load interview questions');
        console.error('Session load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  return { session, isLoading, error };
};