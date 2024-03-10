// documentService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request headers:', config.headers);
    return config;
}, (error) => {
    return Promise.reject(error);
});


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

export const getDocuments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/documents`);
        return response.data;
    } catch (error) {
        console.error('Error fetching documents:', error.message);
        throw error;
    }
};

export const createDocument = async (documentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/documents`, documentData);
        console.log('Create Document Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error creating a new document:', error.message);
        throw error;
    }
};

export const getDocumentsByUser = async (userID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/documents/${userID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching documents by user:', error.message);
        throw error;
    }
};

export const signDocument = async (documentID, userAccessLevel) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/documents/${documentID}/sign`, { userAccessLevel });
        console.log('Sign Document Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error signing document:', error.message);
        throw error;
    }
};

export const updateDocumentStatus = async (documentID, newStatus, userAccessLevel) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/documents/${documentID}/status`, { newStatus, userAccessLevel });
        console.log('Update Document Status Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error updating document status:', error.message);
        throw error;
    }
};
