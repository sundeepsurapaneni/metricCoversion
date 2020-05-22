import React, { useState } from "react";
import { Table, Tr } from 'styled-table-component';
import Form from "../Form";

const metricsMap = {
    kelvin: {
        celsius: (a) => a - 273.15,
        fahrenheit: (a) => (a - 273.15) * (9 / 5) + 32,
        rankine: (a) => (a - 273.15) * 1.8 + 491.67
    },
    celsius: {
        kelvin: (a) => a + 273.15,
        fahrenheit: (a) => a * (9 / 5) + 32,
        rankine: (a) => a * (9 / 5) + 491.67
    },
    fahrenheit: {
        kelvin: (a) => (a - 32) * (5 / 9) + 273.15,
        celsius: (a) => (a - 32) * (5 / 9),
        rankine: (a) => a + 459.67
    },
    rankine: {
        kelvin: (a) => a * (5 / 9),
        celsius: (a) => (a - 492.67) * (5 / 9),
        fahrenheit: (a) => a - 459.67
    },
    liters: {
        tableSpoons: (a) => a * 67.628045,
        cubicInches: (a) => a * 61.024,
        cups: (a) => a * 4.22675,
        cubicFeet: (a) => a - 0.0353147,
        gallons: (a) => a * 0.26417,
    },
    tableSpoons: {
        liters: (a) => a * 0.0147868,
        cubicInches: (a) => a * 0.902344,
        cups: (a) => a * 0.0625,
        cubicFeet: (a) => a * 0.00052219,
        gallons: (a) => a * 0.00390625,
    },
    cubicInches: {
        liters: (a) => a * 0.0163871,
        tableSpoons: (a) => a * 1.10823,
        cups: (a) => a * 0.0682794,
        cubicFeet: (a) => a * 0.000578704,
        gallons: (a) => a * 0.004329,
    },
    cups: {
        liters: (a) => a * 0.236588,
        tableSpoons: (a) => a * 16,
        cubicInches: (a) => a * 14.4375,
        cubicFeet: (a) => a * 0.00835503,
        gallons: (a) => a * 0.0625,
    },
    cubicFeet: {
        liters: (a) => a * 28.3168,
        tableSpoons: (a) => a * 1915.01,
        cubicInches: (a) => a * 1728,
        cups: (a) => a - 119.688,
        gallons: (a) => a * 7.48052,
    },
    gallons: {
        liters: (a) => a * 3.78541,
        tableSpoons: (a) => a * 256,
        cubicInches: (a) => a * 231,
        cups: (a) => a - 16,
        cubicFeet: (a) => a * 0.133681,
    }
};

const getOutput = (input) => {
    const { numValue, inputUnit, targetUnit, studentResponse } = input;
    if (metricsMap[inputUnit]) {
        if (metricsMap[inputUnit][targetUnit]) {
            const result = metricsMap[inputUnit][targetUnit](parseFloat(numValue));
            console.log(result);
            if (parseFloat(studentResponse) === result) return "correct";
            else return "incorrect";
        } else {
            return "invalid";
        }
    }
    return "invalid";
};

const MetricConvert = () => {
    const [list, setList] = useState([]);

    const onSubmiHandler = (data) => {
        setList((old) => [...old, data]);
    };
    return (
        <div style={{ padding: "40px" }}>
            <Form onSubmit={onSubmiHandler} />
            <Table>
                <thead>
                    <tr>
                        <th>Input Numerical Value</th>
                        <th>Input Unit of Measure</th>
                        <th>Target Unit of Measure</th>
                        <th>Student Response</th>
                        <th>Output</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => {
                        const result = getOutput(item);
                        return (
                            <Tr key={index}>
                                <td>{item.numValue}</td>
                                <td style={{ color: result === "invalid" ? "red" : "black" }}>{item.inputUnit}</td>
                                <td>{item.targetUnit}</td>
                                <td style={{ color: result === "incorrect" ? "red" : "black" }}> {item.studentResponse}</td>
                                <td>{result}</td>
                            </Tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default MetricConvert;