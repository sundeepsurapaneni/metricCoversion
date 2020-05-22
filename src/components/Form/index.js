import React, { useState } from "react";
import Input from "../Input";
import { FormGroup } from 'styled-form-component';

const form = [
    {
        id: "numValue",
        label: "Numeric Value",
        type: "number",
    },
    {
        id: "inputUnit",
        label: "Input Unit",
        type: "text",
    },
    {
        id: "targetUnit",
        label: "Target Unit",
        type: "text",
    },
    {
        id: "studentResponse",
        label: "Student Response",
        type: "number",
    },
];

const Form = ({ onSubmit }) => {
    const initialState = {
        numValue: "",
        inputUnit: "",
        targetUnit: "",
        studentResponse: "",
    };

    const [input, setInput] = useState(initialState);

    const onInputChange = (e) => {
        const { id, value } = e.target;
        setInput((old) => ({
            ...old,
            [id]: value.toLowerCase(),
        }));
    };

    return (
        <form
            style={{ width: "25%" }}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(input);
                setInput(initialState);
            }}
        >
            {form.map((item) => (
                <Input key={item.id} id={item.id} onChange={onInputChange} type={item.type} value={input[item.id]} label={item.label} />
            ))}
            <FormGroup>
                <button type="submit">submit</button>
            </FormGroup>
        </form>
    );
};

export default Form;