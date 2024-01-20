import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AttributeDetail.module.css';
import RangeInput from './RangeInput';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import CheckboxInput from './CheckboxInput.js';
import axios from 'axios';
import { useMemo } from 'react';

const attributeQuestions = {
    1: {
        databaseId: "c2c2f05d-c1f2-4a85-92d9-7edbce270298",
        questions: [
            { inputType: 'range', question: 'How many hours of sleep did you get?', min: 5, max: 8.5, step: 0.5, unit: 'hours', propertyName: 'Hours-of-sleep' },
            { inputType: 'range', question: 'How long did it take for you to get up?', min: 0, max: 60, step: 5, unit: 'minutes', propertyName: 'Morning-routine-time' },
            { inputType: 'range', question: 'How long did your morning routine take?', min: 30, max: 120, step: 15, unit: 'minutes', propertyName: 'Time-taken-to-get-up' },
            { inputType: 'radio', question: 'What time were you in bed?', options: ['Before 9:45PM', '9:45PM - 10:45PM', '10:45PM - 11:45PM', 'After 12:00AM'], propertyName: 'Bedtime' },
            // Add more sleep questions here
        ],
    },
    2: {
        databaseId: "acd1f48adfcc4091a351aab15da93b6e",
        questions: [
            { inputType: 'range', question: 'How many calories were you off by today?', min: 0, max: 1500, step: 100, unit: 'calories', propertyName: 'Calories-off' },
            { inputType: 'radio', question: 'Did you avoid excessive snacking today?', options: ['Yes', 'No'], propertyName: 'Avoided-snacking' },
            { inputType: 'radio', question: 'Did you avoid junk food today?', options: ['Yes', 'No'], propertyName: 'Avoided-junk-food' },
            { inputType: 'radio', question: 'Did you take your Vitamin D supplement today?', options: ['Yes', 'No'], propertyName: 'Vitamin-D' },
        ]
    }
    // Add more attributes here
};

const AttributeDetail = () => {
    const { id } = useParams();
    const questions = useMemo(() => attributeQuestions[id]?.questions || [], [id]);

    const [values, setValues] = useState(questions.map(question => question.min || ''));

    // Add this useEffect hook
    useEffect(() => {
        setValues(questions.map(question => question.min || ''));
    }, [id, questions]);

    const handleValueChange = (index, value) => {
        const newValues = [...values];
        const question = questions[index];
        if (question.inputType === 'range') {
            newValues[index] = parseFloat(value);
        } else if (question.inputType === 'checkbox') {
            newValues[index] = Boolean(value);
        } else {
            newValues[index] = value;
        }
        setValues(newValues);
    };

    const handleSync = async () => {
        try {
            const attribute = attributeQuestions[id];
            const databaseId = attribute.databaseId;
            const questions = attribute.questions;

            let properties = {};

            // Add the "Name" and "Date" properties
            properties["Name"] = {
                "title": [
                    {
                        "text": {
                            "content": "🌕🌕🌕🌗🌑" // Replace with the actual title
                        }
                    }
                ]
            };
            const currentDate = new Date().toISOString().split('T')[0];
            properties["Date"] = {
                "date": {
                    "start": currentDate
                }
            };

            for (let i = 0; i < questions.length; i++) {
                let question = questions[i];
                let value = values[i];

                properties[question.propertyName] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": String(value)
                            }
                        }
                    ]
                };
            }

            // Check if a page already exists for the current date
            const pagesResponse = await axios.post(`http://localhost:5001/notion/${databaseId}/query`, {
                filter: {
                    "property": "Date",
                    "date": {
                        "equals": currentDate
                    }
                }
            });
            const existingPage = pagesResponse.data.results[0];

            if (existingPage) {
                // If a page exists, send a PATCH request
                const response = await axios.patch(`http://localhost:5001/notion/${existingPage.id}`, {
                    properties: properties
                });
                console.log(response.data);
            } else {
                // If no page exists, send a POST request
                const response = await axios.post('http://localhost:5001/notion', {
                    parent: { database_id: databaseId },
                    properties: properties
                });
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.attributeDetailContainer}>
            <h1>Attribute Detail for ID: {id}</h1>
            {questions.map((question, index) => {
                const value = values[index];

                return (
                    <div key={index} className={styles.detailElement}>
                        <label>
                            {question.question}
                            {question.inputType === 'range' && (
                                <RangeInput min={question.min} max={question.max} step={question.step} value={value} onChange={(e) => handleValueChange(index, e.target.value)} />
                            )}
                            {question.inputType === 'text' && (
                                <TextInput value={value} onChange={(e) => handleValueChange(index, e.target.value)} />
                            )}
                            {question.inputType === 'radio' && (
                                <RadioInput name={`question-${index}`} options={question.options} value={value} onChange={(e) => handleValueChange(index, e.target.value)} />
                            )}
                            {question.inputType === 'checkbox' && (
                                <CheckboxInput checked={value} onChange={(e) => handleValueChange(index, e.target.checked)} />
                            )}
                            <span>{value} {question.unit}</span>
                        </label>
                    </div>
                );
            })}
            <button onClick={handleSync}>Sync</button>
        </div>
    );
}

export default AttributeDetail;