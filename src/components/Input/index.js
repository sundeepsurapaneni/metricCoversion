import React from "react";
import { FormGroup, FormControl } from 'styled-form-component';

const Input = ({ id, label, onChange, value, type }) => {
    return (
        <FormGroup>
            <label htmlFor={id}>{label}</label>
            <FormControl type={type} id={id} onChange={onChange} value={value} />
        </FormGroup>
    );
};

export default Input;