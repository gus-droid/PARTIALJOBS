import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const formData = location.state as { [key: string]: string };

    return (
        <div>
            <h1>Your Tailored Diet Plan</h1>
            <p>Based on the information you provided, here's what we recommend:</p>
            {/* Display results here */}
        </div>
    );
};

export default ResultPage;
