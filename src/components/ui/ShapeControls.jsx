import React from 'react';

const ShapeControls = ({ addShape }) => {
    return (
        <div className="shape-controls" style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000 }}>
            <button 
                onClick={() => addShape('cube')} 
                style={{ margin: '0 5px', padding: '5px 10px' }}
            >
                Add Cube
            </button>
            <button 
                onClick={() => addShape('sphere')} 
                style={{ margin: '0 5px', padding: '5px 10px' }}
            >
                Add Sphere
            </button>
            <button 
                onClick={() => addShape('cylinder')} 
                style={{ margin: '0 5px', padding: '5px 10px' }}
            >
                Add Cylinder
            </button>
        </div>
    );
};

export default ShapeControls;
