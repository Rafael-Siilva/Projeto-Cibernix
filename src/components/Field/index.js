import React from 'react';
import { useField } from 'formik';


export const Field = ({ label, ...props }) => {
    const [inputProps,] = useField(props);
    const id = props.id || props.name

    return (
        <>
            
                <label htmlFor={id}>{label}</label>
                <input id={id} {...inputProps} {...props} />
            
        </>
    );
}