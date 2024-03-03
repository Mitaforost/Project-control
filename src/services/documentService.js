// documentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getProjects = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/projects?page=${page}`);
        return { data: response.data, status: response.status, error: null };
    } catch (error) {
        console.error('Ошибка при получении проектов:', error.message);
        return { data: null, status: null, error: error.message };
    }
};

export const addProject = async (project) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/projects`, project);
        console.log('Add Project Response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};
