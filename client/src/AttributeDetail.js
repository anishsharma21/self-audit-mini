import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const attributeQuestions = {
    1: [
        { inputType: 'range', question: 'How many hours of sleep did you get?', min: 5, max: 8.5, step: 0.5, unit: 'hours' },
        { inputType: 'range', question: 'How long did it take for you to get up?', min: 0, max: 60, step: 5, unit: 'minutes' },
        { inputType: 'range', question: 'How long did your morning routine take?', min: 30, max: 120, step: 15, unit: 'minutes' },
        { inputType: 'radio', question: 'What time were you in bed?', options: ['Before 9:45PM', '9:45PM - 10:45PM', '10:45PM - 11:45PM', 'After 12:00AM'] },
        // Add more sleep questions here
    ],
    2: [
        { inputType: 'range', question: 'Did you hit your calorie goal?', min: 0, max: 1000, step: 100, unit: 'calories' },
        { inputType: 'radio', question: 'Avoided excessive or unnecessary snacking?', options: ['Not at all', 'A little', 'Somewhat', 'Mostly', 'Completely'] },
        { inputType: 'radio', question: 'Avoided junk food?', options: ['Not at all', 'Somewhat', 'Completely'] },
        { inputType: 'checkbox', question: 'Did you take your Vitamin D supplement?' },
        // Add more diet questions here
    ],
    // Add more attributes here
};

const AttributeDetail = () => {
    const { id } = useParams();
    const questions = attributeQuestions[id] || [];

    const [values, setValues] = useState(questions.map(question => question.min || ''));

    const handleValueChange = (index, value) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    const handleSync = () => {
        // Sync data with Notion here
        console.log('Syncing data...');
    };

    return (
        <div>
            <h1>Attribute Detail for ID: {id}</h1>
            {questions.map((question, index) => {
                const value = values[index];

                return (
                    <div key={index}>
                        <label>
                            {question.question}
                            {question.inputType === 'range' && (
                                <input type="range" min={question.min} max={question.max} step={question.step} value={value} onChange={(e) => handleValueChange(index, e.target.value)} />
                            )}
                            {question.inputType === 'text' && (
                                <input type="text" value={value} onChange={(e) => handleValueChange(index, e.target.value)} />
                            )}
                            {question.inputType === 'radio' && question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input type="radio" name={`question-${index}`} value={option} checked={value === option} onChange={(e) => handleValueChange(index, e.target.value)} />
                                    <label>{option}</label>
                                </div>
                            ))}
                            {question.inputType === 'checkbox' && (
                                <input type="checkbox" checked={value} onChange={(e) => handleValueChange(index, e.target.checked)} />
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