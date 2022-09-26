import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch } from 'react-redux';

/**
 * 
 * @param {message} string  
 * @param {onClickFunction} function
 * @returns ConfirmationModal
 */
export const ConfirmationModal = (title, message, onClickFunction) => {
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'Yes',
                onClick: () => onClickFunction()
            },
            {
                label: 'No',
                // onClick: () => alert('Click No')
            }
        ]
    });
};
