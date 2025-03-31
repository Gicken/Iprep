import axios from 'axios';
import { API_ENDPOINTS } from '../../../lib/constants';

export const fetchCVs = async (setCvs, setError) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(API_ENDPOINTS.All_CVs, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    setCvs(response.data);
  } catch (err) {
    setError('Failed to fetch CVs. Please try again.', err);
  }
};

export const uploadCV = async (selectedFile, setIsUploading, setSuccess, setError, setSelectedFile, fetchCVs, setCvs) => {
  if (!selectedFile) {
    setError('Please select a file');
    return;
  }

  setIsUploading(true);
  setError('');
  setSuccess('');

  try {
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', selectedFile);

    await axios.post(API_ENDPOINTS.Upload_CV, formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
    });

    setSuccess('CV uploaded successfully');
    setSelectedFile(null);
    fetchCVs(setCvs, setError);
  } catch (err) {
    setError('Failed to upload CV. Please try again.', err);
  } finally {
    setIsUploading(false);
  }
};

export const deleteCV = async (cvId, setCvs, setSuccess, setError) => {
  if (!window.confirm('Are you sure you want to delete this CV?')) return;

  try {
    const token = sessionStorage.getItem('token');
    await axios.delete(`${API_ENDPOINTS.All_CVs}/${cvId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setCvs(prevCvs => prevCvs.filter(cv => cv.id !== cvId));
    setSuccess('CV deleted successfully');
  } catch (err) {
    setError('Failed to delete CV. Please try again.', err);
  }
};

export const downloadCV = async (cvId, setError) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${API_ENDPOINTS.All_CVs}/${cvId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers.get('file-name'));
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    setError('Failed to download CV. Please try again.', err);
  }
};
