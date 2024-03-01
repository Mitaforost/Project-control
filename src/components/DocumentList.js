import React, { useState, useEffect } from 'react';
import { getDocuments } from '../services/documentService';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div>
            <h2>Document List</h2>
            <ul>
                {documents.map((document) => (
                    <li key={document.id}>{document.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;
