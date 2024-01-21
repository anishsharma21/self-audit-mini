export const attributeQuestions = {
    1: {
        databaseId: "c2c2f05d-c1f2-4a85-92d9-7edbce270298",
        questions: [
            { inputType: 'range', question: 'How many hours of sleep did you get?', min: 4, max: 8.5, step: 0.25, unit: 'hours', propertyName: 'Hours-of-sleep', propertyPrefix: "Time sleeping: ", propertySuffix: " hours" },
            { inputType: 'range', question: 'How long did it take for you to get up?', min: 0, max: 60, step: 5, unit: 'minutes', propertyName: 'Morning-routine-time', propertyPrefix: "Got up after: ", propertySuffix: " minutes" },
            { inputType: 'range', question: 'How long did your morning routine take?', min: 30, max: 120, step: 5, unit: 'minutes', propertyName: 'Time-taken-to-get-up', propertyPrefix: "Morning Routine: ", propertySuffix: " minutes" },
            { inputType: 'radio', question: 'What time were you in bed?', options: ['Before 9:45PM', '9:45PM', '9:55PM', '10:15PM', '10:30PM', '10:45PM', '11:00PM', '11:30PM', '12:00AM', 'After 12:00AM'], propertyName: 'Bedtime', propertyPrefix: "Bedtime: ", propertySuffix: "" },
            { inputType: 'radio', question: 'What time were you asleep?', options: ['Before 10:00PM', '10:15PM', '10:30PM', '10:45PM', '11:00PM', '11:15PM', '11:30PM', '11:45PM', '12:00AM', 'After 12:30AM'], propertyName: 'Asleep-at', propertyPrefix: "Asleep at: ", propertySuffix: "" },
            { inputType: 'radio', question: 'Did you do your night routine?', options: ['Done', 'Not done'], propertyName: 'Night-routine', propertyPrefix: "Night routine: ", propertySuffix: "" },
            { inputType: 'range', question: 'How many minutes of deep sleep did you get?', min: 5, max: 120, step: 5, unit: 'minutes', propertyName: 'Deep-sleep', propertyPrefix: "Deep Sleep: ", propertySuffix: " minutes" },
            { inputType: 'radio', question: 'Did you meditate?', options: ['Yes', 'No'], propertyName: 'Meditated', propertyPrefix: "Meditated: ", propertySuffix: "" },
            { inputType: 'radio', question: 'Did you get your morning steps in?', options: ['Done', 'Not done'], propertyName: 'Morning-steps', propertyPrefix: "Morning steps: ", propertySuffix: "" },
            { inputType: 'range', question: 'How many times did you wake up during the night?', min: 0, max: 5, step: 1, unit: 'times', propertyName: 'Woke-up-times', propertyPrefix: "Woke up: ", propertySuffix: " times" },
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