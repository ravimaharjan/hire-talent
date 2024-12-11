import React from 'react';

const MultiLineComponent = ({ text }) => {

    return (
        <div style={{ whiteSpace: 'pre-line' }}>
            {text}
        </div>
    );
};

export default MultiLineComponent;