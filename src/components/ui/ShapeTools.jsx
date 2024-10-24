import React, { useState } from 'react';

const ShapeTools = ({ onShapeSelect }) => {
    const [selectedShape, setSelectedShape] = useState(null);

    const containerStyle = {
        position: 'absolute',
        right: '20px',
        top: '120px', // Position below BoxelInfo
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        color: 'white',
        fontFamily: 'Font, serif',
        minWidth: '200px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    const buttonStyle = (shape) => ({
        backgroundColor: selectedShape === shape ? '#4a4a4a' : '#2c2c2c',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '8px 12px',
        margin: '4px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.2s',
        fontFamily: 'Font, serif',
    });

    const handleShapeSelect = (shape) => {
        const newShape = selectedShape === shape ? null : shape;
        setSelectedShape(newShape);
        onShapeSelect(newShape);
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2em' }}>Shape Tools</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                    style={buttonStyle('cube')}
                    onClick={() => handleShapeSelect('cube')}
                >
                    Add Cube
                </button>
                <button 
                    style={buttonStyle('sphere')}
                    onClick={() => handleShapeSelect('sphere')}
                >
                    Add Sphere
                </button>
                <button 
                    style={buttonStyle('cylinder')}
                    onClick={() => handleShapeSelect('cylinder')}
                >
                    Add Cylinder
                </button>
            </div>
            {selectedShape && (
                <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#999' }}>
                    Click in scene to place {selectedShape}
                </div>
            )}
        </div>
    );
};

export default ShapeTools;
