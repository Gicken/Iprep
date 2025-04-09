import { useState, useRef, useEffect } from 'react'
import { interviewApi } from '../api/InterviewApi'
import {
  QuestionCard,
  RecordingSection,
  SubmissionControls,
  Transcription,
  ChatInterface,
  ToggleVisibilityButton,
  LoadingOverlay,
  Modal
} from '../components'
import { useNavigate } from 'react-router-dom'

export const InterviewContainer = ({sessionId}) => {

  const [session, setSession] = useState(null);

  const loadSession = async () => {
    try {
      const sessionData = await interviewApi.getSession(sessionId);
      setSession(sessionData);
    } catch (err) {
      console.error('Session load error:', err);
    } 
  }
  useEffect(() => {
    loadSession()
  },[])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();
  const currentQuestion = session?session.questions[currentQuestionIndex]:null
  const isLastQuestion = currentQuestionIndex === (session?.length || 0) - 1
  const childRef = useRef(null)

 
  const clearAudio = () => {
    if(childRef.current){
      childRef.current.clearPreviousAudio()
    }
  }
  
  const handleCloseModal = () => {
    sessionStorage.removeItem('sessionID');
    setIsModalOpen(false)
    navigate('/dashboard');
  }

  const handleRecordingComplete = async audioBlob => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)

    } else {
      alert('Audio recording failed. Please try again.')
      return
    }

    try {
      const response = await interviewApi.uploadResponse(
        audioBlob,
        currentQuestion.id
      )
      setTranscript(response.text || 'Transcription unavailable')

    //   console.log('Current Question: ', currentQuestion)

    } catch (error) {
      console.error('Transcription error:', error)
      setTranscript('Error transcribing audio.')
    }
  }

  const handleSubmitResponse = async () => {
    if (isSubmitting || !audioUrl) {
      alert('Please complete the recording before submitting.')
      return
    }

    try {
      setIsSubmitting(true)
      //upload response
      const uploadedResponse = await interviewApi.uploadResponse(
        await fetch(audioUrl).then(r => r.blob()),
        currentQuestion.id
      )
     
      //wait for feedback to be generated for our response
      await interviewApi.generateFeedback(uploadedResponse.id)

      if (!isLastQuestion) {
        //wait for next question to be generated
        await interviewApi.generateQuestion(sessionId)
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      } else {
        // Display completion card
        setIsModalOpen(true)
      }
      //clear values after a submit
      setTranscript("")
      clearAudio()
      setAudioUrl(null)
      //get the new session object from the db
      loadSession()
    } catch (error) {
      console.error('Upload failed:', error)
      console.error('Error:',error.response.data)
      alert('Failed to submit response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!session){
  return(
    <div>Loading</div>
  )
  }
  else if (!session.questions[currentQuestionIndex]){
    return(
      <div>Loading</div>
    )
    }
  return (
    <div className='container mx-auto p-4'>
      <QuestionCard question={currentQuestion} index={currentQuestionIndex} />
      <RecordingSection ref={childRef} onRecordingComplete={handleRecordingComplete} />

      <ToggleVisibilityButton
        isVisible={isVisible}
        onClick={() => setIsVisible(!isVisible)}
      />

      {isVisible && (
        <div>
          <Transcription transcript={transcript} />
          <ChatInterface
            transcript={transcript}
            setTranscript={setTranscript}
          />
        </div>
      )}

      <SubmissionControls
        isSubmitting={isSubmitting}
        isLastQuestion={isLastQuestion}
        onSubmit={handleSubmitResponse}
      />

      {isSubmitting && <LoadingOverlay text='Submitting response...' />}

      {/* Modal for displaying summary */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title='Interview Complete!'
      >
        <div
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}
        >
          <p className='text-black'>Your feedback will be available shortly</p>
        </div>
      </Modal>
    </div>
  )
}
