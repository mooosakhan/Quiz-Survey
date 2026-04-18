/**
 * API Configuration
 * Uses environment variables for flexible deployment
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;

/**
 * Usage in components:
 * import API_BASE_URL from '@/config';
 * 
 * fetch(`${API_BASE_URL}/api/users/submit`, {...})
 */
