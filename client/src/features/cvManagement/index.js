export { fetchCVs, uploadCV, deleteCV, downloadCV } from './api/cvAPI';

// Export reusable components
export { default as CVList } from './components/CVList';
export { default as FileUpload } from './components/FileUpload';

// Export the main authentication pages
export { default as CVManager } from './pages/CVManager';