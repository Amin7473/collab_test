import React from 'react';

const ProgressBar = ({ progress, height, color }) => {
    return (
        <div className={`w-full bg-gray-300 rounded-full ${height} overflow-hidden`}>
            <div
                className={`${color} h-full text-center text-white text-sm font-medium leading-none rounded-l-full`}
                style={{ width: `${progress}%` }}
            >
            </div>
        </div>
    );
};

export default ProgressBar;
