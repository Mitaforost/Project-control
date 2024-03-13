import React, { useState } from 'react';
import { updateDocumentStatus, signDocument, getDocumentById } from '../services/documentService';

const DocumentTable = ({ documents, onSignDocument, sentByUserID, onChangeStatus, userAccessLevel }) => {
    const [updatedDocuments, setUpdatedDocuments] = useState(documents);
    const handleChangeStatus = async (documentID, newStatus) => {
        try {
            const numericSentByUserID = parseInt(userAccessLevel, 10);

            if (isNaN(numericSentByUserID)) {
                throw new Error('Invalid userAccessLevel. Must be a valid number.');
            }

            console.log('Numeric sentByUserID:', numericSentByUserID);
            const updatedDocument = await updateDocumentStatus(documentID, newStatus, numericSentByUserID);
            onChangeStatus(documentID, newStatus);

            setUpdatedDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === updatedDocument.DocumentID ? updatedDocument : doc
                )
            );
            console.log(`Document ${documentID} status changed to ${newStatus}`);
        } catch (error) {
            console.error('Error changing document status:', error.message);
            alert(`Ошибка при изменении статуса документа: ${error.message}`);
        }
    };

    const handleSignClick = async (documentID) => {
        try {
            const document = await getDocumentById(documentID);

            if (!document || !document.Status) {
                console.error('Document status not available:', document);
                return;
            }

            console.log('Document status before signing:', document.Status);

            if (document.Status === 'Signed') {
                console.log('Document is already signed.');
                return;
            }

            const signedDocument = await signDocument(documentID, 'Администратор');

            // Update the document status in the parent component
            onChangeStatus(documentID, 'Signed');

            setUpdatedDocuments((prevDocuments) =>
                prevDocuments.map((doc) =>
                    doc.DocumentID === signedDocument.DocumentID ? signedDocument : doc
                )
            );
        } catch (error) {
            console.error('Error signing document:', error.message);
        }
    };
    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {updatedDocuments.map((document) => (
                <tr key={document.DocumentID}>
                    <td>{document.Title}</td>
                    <td>{document.Content}</td>
                    <td>{document.DateCreated}</td>
                    <td>{document.Status}</td>
                    <td>
                        {document.Status === 'Draft' && (
                            <div className="documents__control">
                                <button
                                    className="btn-primary documents__btn"
                                    onClick={() => handleChangeStatus(document.DocumentID, 'Pending')}
                                >
                                    Отправить на рассмотрение
                                </button>
                            </div>
                        )}

                        {document.Status === 'Pending' && userAccessLevel === 1 && (
                            <div>
                                <button
                                    className="btn-primary documents__btn"
                                    onClick={() => handleSignClick(document.DocumentID)}
                                >
                                    Подписать
                                </button>
                            </div>
                        )}
                        {document.Action && (
                            <div className="documents__action">
                                <p>{document.Action}</p>
                            </div>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DocumentTable;
