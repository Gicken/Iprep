import { useState, useRef } from 'react'
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

export const InterviewContainer = ({ session }) => {
  // const [updateSession,setUpdateSession] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [summaryData, setSummaryData] = useState('')
  const [transcript, setTranscript] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();
  const currentQuestion = session.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === session.length - 1
  const childRef = useRef(null)




  const clearAudio = () => {
    if(childRef.current){
      childRef.current.clearPreviousAudio()
    }
  }
  
  const handleCloseModal = () => {
    sessionStorage.removeItem('interviewResponses');
    setIsModalOpen(false)
    navigate('/dashboard');
  }

  const handleRecordingComplete = async audioBlob => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
      // console.log(updateSession)
      // setUpdateSession(!updateSession)

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

      const questionText =
        currentQuestion?.question_text || `Question ${currentQuestionIndex + 1}`
      console.log('Current Question: ', currentQuestion)
      // Save response to session storage
      const storedResponses =
        JSON.parse(sessionStorage.getItem('interviewResponses')) || {}

      storedResponses[questionText] = response.text || 'No response available'

      sessionStorage.setItem(
        'interviewResponses',
        JSON.stringify(storedResponses)
      )
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
      // 
      const uploadedResponse = await interviewApi.uploadResponse(
        await fetch(audioUrl).then(r => r.blob()),
        currentQuestion.id
      )
     

      //wait for feedback to be generated for our response
      await interviewApi.generateFeedback(uploadedResponse.id)

      //wait for next question to be generated
      await interviewApi.generateQuestion(sessionStorage.getItem('sessionID'))

      // setUpdateSession(!updateSession)
      if (!isLastQuestion) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
      } else {
        // Fetch all responses from session storage for summary
        const allResponses =
          JSON.parse(sessionStorage.getItem('interviewResponses')) || {}

        const summary = Object.entries(allResponses)
          .map(([question, answer]) => `${question}: ${answer}`)
          .join('\n\n')
        
        setSummaryData(summary)
        setIsModalOpen(true)
      }
      //clear values after a submit
      setTranscript("")
      clearAudio()
      setAudioUrl(null)
    } catch (error) {
      console.error('Upload failed:', error)
      console.error('Error:',error.response.data)
      alert('Failed to submit response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
        title='Interview Summary'
      >
        <div
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}
        >
          <p>{summaryData}</p>
        </div>
      </Modal>
    </div>
  )
}
