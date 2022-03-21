import React, { useState } from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';


const MultiEmail = (props) => {

    return (
        <>
            <ReactMultiEmail
                placeholder={props.placeholder}
                emails={props.emails}
                onChange={(_emails) => props.setEmails(_emails)}
                validateEmail={email => {
                    if (props.loggedInEmailId === email) {
                        props.setValidEmail(false);
                        return false;
                    } else {
                        props.setValidEmail(isEmail(email));
                        return isEmail(email); // return boolean    
                    }
                }}
                getLabel={(
                    email: string,
                    index: number,
                    removeEmail: (index: number) => void,
                ) => {
                    return (
                        <div data-tag key={index}>
                            {email}
                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                ×
                            </span>
                        </div>
                    );
                }}
            />
        </>
    );
}

export default MultiEmail;


