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

export const editProject = async (editedProject) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/projects/${editedProject.ProjectID}`, editedProject);
        console.log('Edit Project Response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};
export const createProject = async (project) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/projects`, project);
        console.log('Create Project Response:', response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteProject = async (projectId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/projects/${projectId}`);
        console.log('Delete Project Response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};

