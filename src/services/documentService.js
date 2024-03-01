import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        console.log('Response:', response); // Log the entire response for debugging
        return response;
    } catch (error) {
        throw error;
    }
};


