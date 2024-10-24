import React from 'react';
import { Box, Sphere, Cylinder } from '@react-three/drei';

const Shapes = ({ shapes }) => {
    return shapes.map((shape, index) => {
        const { type, position, color } = shape;

        return (
            <mesh key={index} position={position}>
                {type === 'cube' && (
                    <Box args={[1, 1, 1]}>
                        <meshStandardMaterial color={color} />
                    </Box>
                )}
                {type === 'sphere' && (
                    <Sphere args={[0.5, 32, 32]}>
                        <meshStandardMaterial color={color} />
                    </Sphere>
                )}
                {type === 'cylinder' && (
                    <Cylinder args={[0.5, 0.5, 1]}>
                        <meshStandardMaterial color={color} />
                    </Cylinder>
                )}
            </mesh>
        );
    });
};

export default Shapes;
