import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AttributeDetail.module.css';
import RangeInput from '../Input-Types/RangeInput.js';
import TextInput from '../Input-Types/TextInput.js';
import RadioInput from '../Input-Types/RadioInput.js';
import CheckboxInput from '../Input-Types/CheckboxInput.js';
import axios from 'axios';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { attributeQuestions } from '../../attributeQuestions';
import { convertToHoursAndMinutes } from '../../utils';

const AttributeDetail = () => {
    console.log('Rendering AttributeDetail component');
    const { id } = useParams();
    const questions = useMemo(() => attributeQuestions[id]?.questions || [], [id]);

    const [values, setValues] = useState(questions.map(question => question.min || ''));

    // Add this useEffect hook
    useEffect(() => {
        setValues(questions.map(question => question.min || ''));
    }, [id, questions]);

    useEffect(() => {
        console.log(id, questions);
        const fetchData = async () => {
            try {
                const attribute = attributeQuestions[id];
                const databaseId = attribute.databaseId;

                const now = DateTime.now().setZone('Australia/Sydney');
                const currentDate = DateTime.utc(now.year, now.month, now.day).toISODate();

                // Retrieve all pages from the database
                const pagesResponse = await axios.post(`http://localhost:5001/notion/${databaseId}/query`);

                console.log('Pages response:', pagesResponse.data.results); // Log the response

                // Filter the pages to find one with the same date
                const existingPage = pagesResponse.data.results.find(page => {
                    const pageDate = DateTime.fromISO(page.properties.Date.date.start);
                    return pageDate.hasSame(DateTime.fromISO(currentDate), 'day');
                });

                if (existingPage) {
                    console.log('Existing page:', existingPage); // Log the existing page
        
                    // If a page exists, update the values state with the existing data
                    const newValues = questions.map(question => {
                        console.log('Existing page properties:', existingPage.properties[question.propertyName]?.rich_text[0]);
                        let existingValue = existingPage.properties[question.propertyName]?.rich_text[0]?.plain_text;
                        console.log(`Existing value for ${question.propertyName}:`, existingValue); // Log the existing value
        
                        if (typeof existingValue === 'string') {
                            // Split the string into parts using the first colon as the delimiter
                            const parts = existingValue.split(/:(.+)/);
                            // The actual value should be the rest of the string, after trimming any leading or trailing whitespace
                            existingValue = parts[1]?.trim();
                        }
        
                        if (existingValue !== undefined) {
                            if (question.inputType === 'range') {
                                const numberValue = parseFloat(existingValue);
                                return isNaN(numberValue) ? question.min || '' : numberValue;
                            } else if (question.inputType === 'checkbox') {
                                return existingValue.toLowerCase() === 'true';
                            } else if (question.inputType === 'radio') {
                                // Define a function to determine if an option matches the existing value
                                const isOptionMatching = (option) => {
                                    // Create a regular expression from the option
                                    const regex = new RegExp(`^${option.trim()}$`, 'i');
                                    // If the existing value matches the regular expression, it's a match
                                    return regex.test(existingValue);
                                };
                            
                                // Find the option that matches the existing value
                                const matchingOption = question.options.find(isOptionMatching);
                            
                                return matchingOption || question.options[0];
                            } else {
                                return existingValue;
                            }
                        } else {
                            return question.min || '';
                        }
                    });
                    setValues(newValues);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
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
            const now = DateTime.now().setZone('Australia/Sydney');
            const currentDate = DateTime.utc(now.year, now.month, now.day).toISODate();

            properties["Date"] = {
                "date": {
                    "start": currentDate
                }
            };

            for (let i = 0; i < questions.length; i++) {
                let question = questions[i];
                let value = values[i];
                if(question.propertyPrefix) {
                    value = `${question.propertyPrefix}${value}`;
                }
                if(question.propertySuffix) {
                    value = `${value}${question.propertySuffix}`;
                }

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

            // Retrieve all pages from the database
            const pagesResponse = await axios.post(`http://localhost:5001/notion/${databaseId}/query`);

            // Filter the pages to find one with the same date
            const existingPage = pagesResponse.data.results.find(page => {
                const pageDate = DateTime.fromISO(page.properties.Date.date.start);
                return pageDate.hasSame(DateTime.fromISO(currentDate), 'day');
            });

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
                            <span>
                                {question.propertyName === 'Hours-of-sleep' ? convertToHoursAndMinutes(value) : `${value} ${question.unit ? question.unit : ''}`}
                            </span>
                        </label>
                    </div>
                );
            })}
            <button onClick={handleSync}>Sync</button>
        </div>
    );
}

export default AttributeDetail;