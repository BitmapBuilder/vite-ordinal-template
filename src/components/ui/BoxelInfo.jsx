import React from 'react';
import ShapeControls from './ShapeControls';

const BoxelInfo = ({ addShape }) => {
    return (
        <div className="boxel-info">
            <h2>Boxel Information</h2>
            {/* Existing content */}
            <ShapeControls addShape={addShape} />
        </div>
    );
};

export default BoxelInfo;
