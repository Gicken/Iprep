# API Documentation

## Overview
This document provides detailed information about the API endpoints for the AI Mock Interview Platform. It includes request and response structures, authentication requirements, and error handling guidelines.

## Base URL
```
https://api.yourdomain.com/v1
```

## Authentication
All API requests require authentication using JWT tokens. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### 1. User Management

#### **Register a User**
- **Endpoint:** `POST /users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "id": "12345",
    "email": "johndoe@example.com",
    "message": "User registered successfully"
  }
  ```

#### **User Login**
- **Endpoint:** `POST /users/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### 2. Interview Management

#### **Start an Interview Session**
- **Endpoint:** `POST /interviews/start`
- **Description:** Initiates a new interview session.
- **Request Body:**
  ```json
  {
    "user_id": "12345",
    "job_title": "Software Engineer",
    "company_name": "TechCorp"
  }
  ```
- **Response:**
  ```json
  {
    "session_id": "67890",
    "message": "Interview session started"
  }
  ```

#### **Submit an Answer**
- **Endpoint:** `POST /interviews/{session_id}/answers`
- **Description:** Submits an answer for a given question.
- **Request Body:**
  ```json
  {
    "question_id": "q123",
    "answer": "My response to the question."
  }
  ```
- **Response:**
  ```json
  {
    "feedback": "Your answer was relevant but could be more detailed."
  }
  ```

### 3. Feedback and Reports

#### **Get Interview Feedback**
- **Endpoint:** `GET /interviews/{session_id}/feedback`
- **Description:** Retrieves AI-generated feedback for a completed interview session.
- **Response:**
  ```json
  {
    "session_id": "67890",
    "overall_score": 85,
    "strengths": ["Confidence", "Technical Knowledge"],
    "improvement_areas": ["More structured responses"]
  }
  ```

#### **Download Summary Report**
- **Endpoint:** `GET /interviews/{session_id}/summary`
- **Description:** Provides a link to download the interview summary report.
- **Response:**
  ```json
  {
    "pdf_url": "https://storage.yourdomain.com/reports/summary67890.pdf"
  }
  ```

## Error Handling
Errors follow this standard format:
```json
{
  "error": "Invalid credentials",
  "code": 401
}
```

## Conclusion
This API allows seamless management of users, interview sessions, and AI-generated feedback. Future updates will introduce additional features such as real-time coaching and premium content access.

