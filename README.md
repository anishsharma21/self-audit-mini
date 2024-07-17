# Self-Audit-Mini 🗒️

Self-Audit-Mini is a personalised, all-encompassing habit tracking application designed primarily for interfacing directly with personal Notion productivity dashboards. It serves as a powerful tool for individuals looking to monitor and enhance their daily habits, including diet, sleep, physical activity, and various personal habits, through a simple-to-use and personalized interface.

## Key Features

- **Attribute Tracking**: Users can track various health attributes such as sleep, diet, physical activity, mental health, social interactions, reading habits, and more.
- **Interactive UI**: The app features a dynamic user interface with attribute icons and detailed views for each health aspect, making health tracking engaging and informative.
- **Responsive Design**: Crafted with a responsive design, the app offers a seamless experience across different devices and screen sizes.

## Technical Features

- **Direct Integration with Notion**: Seamlessly interfaces with Notion productivity dashboards, allowing for an integrated view of your habits and productivity metrics.
- **Protected Routes**: Ensures user data privacy and security by implementing protected routes that require authentication (JWT)
- **Video Demo**: A video demonstration of the product is available on the homepage, showcasing the app's capabilities and how it can be integrated into your daily routine.

## Technologies Used

- **Frontend**: React, React Router
- **Styling**: CSS Modules
- **Backend**: Express, Node.js
- **Database**: JSON file for user data storage (for demonstration purposes)
- **Authentication**: JWT and bcrypt for secure user authentication

## Project Structure

- `client/`: Contains the React frontend application.
  - `src/`: Source code for the frontend, including components, utilities, and styles.
  - `public/`: Public assets and the HTML template.
- `server/`: Contains the Express backend application.
  - `models/`: Mock database models (only users currently)
  - `server.js`: Entry point for the server application.
