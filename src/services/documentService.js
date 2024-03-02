// documentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getProjects = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`, {
            params: { page },
        });
        console.log('Response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addProject = async (project) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects`, project);
        console.log('Add Project Response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};
