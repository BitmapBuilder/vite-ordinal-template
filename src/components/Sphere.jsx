import { Sphere } from '@react-three/drei';

const BlueSphere = () => {
    return (
        <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
            <meshStandardMaterial attach="material" color="blue" />
        </Sphere>
    );
}

export default BlueSphere;
