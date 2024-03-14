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
        return {data: response.data, status: response.status, error: null};
    } catch (error) {
        console.error('Ошибка при получении проектов:', error.message);
        return {data: null, status: null, error: error.message};
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

export const createDocument = async (documentData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/documents`, documentData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('Create Document Response:', response);

        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Unexpected status code:', response.status);
            throw new Error('Failed to create document');
        }
    } catch (error) {
        console.log(error); // Вывод подробной информации об ошибке
        throw error.response ? error.response.data : error.message;
    }
};

export const getDocumentById = async (documentID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/documents/${documentID}`);
        console.log('getDocumentById Response:', response);

        if (!response.data || response.data.length === 0) {
            console.warn(`Document with ID ${documentID} not found`);
            return {}; // Return null for not found documents
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching document by ID ${documentID}:`, error);
        throw error;
    }
};

export const signDocument = async (documentID, signer) => {
    try {
        console.log('Попытка подписи документа:', documentID, signer);
        const token = localStorage.getItem('token');
        const document = await getDocumentById(documentID);
        console.log('Информация о документе перед подписью:', document);
        if (!document) {
            throw new Error(`Document with ID ${documentID} not found`);
        }

        if (!document.Status) {
            throw new Error('Document status not available');
        }

        if (document.Status !== 'Pending') {
            throw new Error('Invalid document status for signing');
        }

        console.log(`Attempting to sign document with ID ${documentID} by ${signer}`);
        await axios.put(`http://localhost:3001/api/documents/${documentID}/sign`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Update the document with the signed action and status
        const signedDocument = {
            ...document,
            Action: `Signed by: ${signer}`, // Замените на свою логику идентификации пользователя
            Status: 'Signed',
        };
        console.log('Документ успешно подписан:', documentID);
        return signedDocument;
    } catch (error) {
        console.error('Error signing document:', error.message);
        throw error;
    }
};
export const updateDocumentStatus = async (documentID, newStatus, sentByUserID) => {
    try {
        console.log('Updating document status:', documentID, newStatus, sentByUserID);
        console.log('Checking access level:', sentByUserID);

        const response = await axios.put(`http://localhost:3001/api/documents/${documentID}/status`, {
            newStatus,
            sentByUserID,
        });

        console.log('Update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating document status:', error.response ? error.response.data : error.message);

        // Добавьте обработку ошибок, например, вывод в консоль или в интерфейс пользователя
        console.error(error);

        throw error;
    }
};

