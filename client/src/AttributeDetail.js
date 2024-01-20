import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AttributeDetail.module.css';
import RangeInput from './RangeInput';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import CheckboxInput from './CheckboxInput.js';
import axios from 'axios';

const attributeQuestions = {
    1: [
        { inputType: 'range', question: 'How many hours of sleep did you get?', min: 5, max: 8.5, step: 0.5, unit: 'hours' },
        { inputType: 'range', question: 'How long did it take for you to get up?', min: 0, max: 60, step: 5, unit: 'minutes' },
        { inputType: 'range', question: 'How long did your morning routine take?', min: 30, max: 120, step: 15, unit: 'minutes' },
        { inputType: 'radio', question: 'What time were you in bed?', options: ['Before 9:45PM', '9:45PM - 10:45PM', '10:45PM - 11:45PM', 'After 12:00AM'] },
        // Add more sleep questions here
    ]
    // Add more attributes here
};

const databaseIdArr = [
    "c2c2f05d-c1f2-4a85-92d9-7edbce270298",
]

const AttributeDetail = () => {
    const { id } = useParams();
    const questions = attributeQuestions[id] || [];

    const [values, setValues] = useState(questions.map(question => question.min || ''));

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
            const response = await axios.post('http://localhost:5001/notion', {
                parent: { database_id: databaseIdArr[id - 1] },
                properties: {
                    "Name": {
                        "title": [
                            {
                                "text": {
                                    "content": "🌕🌕🌕🌗🌑"
                                }
                            }
                        ]
                    },
                    "Date": {
                        "date": {
                            "start": new Date().toISOString().split('T')[0] // Today's date
                        }
                    },
                    "Hours-of-sleep": {
                        "number": values[0] // The first question's response
                    },
                    "Time-taken-to-get-up": {
                        "number": values[1] // The second question's response
                    },
                    "Morning-routine-time": {
                        "number": values[2] // The third question's response
                    },
                    "Bedtime": {
                        "rich_text": [
                            {
                                "text": {
                                    "content": values[3] // The fourth question's response
                                }
                            }
                        ]
                    }
                    // Add more properties here for additional questions
                }
            });
            console.log(response.data);
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