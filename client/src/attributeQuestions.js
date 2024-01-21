export const attributeQuestions = {
    1: {
        databaseId: "c2c2f05d-c1f2-4a85-92d9-7edbce270298",
        questions: [
            { inputType: 'range', question: 'How many hours of sleep did you get?', min: 4, max: 8.5, step: 0.25, unit: 'hours', propertyName: 'Hours-of-sleep', propertyPrefix: "Time sleeping: ", propertySuffix: "" },
            { inputType: 'range', question: 'How long did it take for you to get up?', min: 0, max: 60, step: 5, unit: 'minutes', propertyName: 'Morning-routine-time', propertyPrefix: "Got up after: ", propertySuffix: " minutes" },
            { inputType: 'range', question: 'How long did your morning routine take?', min: 30, max: 120, step: 15, unit: 'minutes', propertyName: 'Time-taken-to-get-up', propertyPrefix: "Morning Routine: ", propertySuffix: " minutes" },
            { inputType: 'radio', question: 'What time were you in bed?', options: ['Before 9:45PM', '9:45PM - 10:45PM', '10:45PM - 11:45PM', 'After 12:00AM'], propertyName: 'Bedtime', propertyPrefix: "Bedtime: ", propertySuffix: "" },
            // Add more sleep questions here
        ],
    },
    2: {
        databaseId: "acd1f48adfcc4091a351aab15da93b6e",
        questions: [
            { inputType: 'range', question: 'How many calories were you off by today?', min: 0, max: 1500, step: 100, unit: 'calories', propertyName: 'Calories-off', propertyPrefix: "Calories off: ", propertySuffix: " calories" },
            { inputType: 'radio', question: 'Did you avoid excessive snacking today?', options: ['Yes', 'No'], propertyName: 'Avoided-snacking', propertyPrefix: "Avoided Snacking: ", propertySuffix: "" },
            { inputType: 'radio', question: 'Did you avoid junk food today?', options: ['Yes', 'No'], propertyName: 'Avoided-junk-food', propertyPrefix: "Avoided Junk Food: ", propertySuffix: ""  },
            { inputType: 'radio', question: 'Did you take your Vitamin D supplement today?', options: ['Yes', 'No'], propertyName: 'Vitamin-D', propertyPrefix: "Vitamin D Taken: ", propertySuffix: "" },
        ]
    }
    // Add more attributes here
};