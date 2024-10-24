import { TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const TransformController = ({ selectedObject, onObjectTransform }) => {
    const { camera } = useThree();

    // Disable orbit controls when transforming
    useEffect(() => {
        const controls = camera.controls;
        if (controls) {
            const callback = (event) => {
                controls.enabled = !event.value;
            };

            document.addEventListener('startTransform', callback);
            document.addEventListener('endTransform', callback);

            return () => {
                document.removeEventListener('startTransform', callback);
                document.removeEventListener('endTransform', callback);
            };
        }
    }, [camera]);

    if (!selectedObject) return null;

    return (
        <TransformControls
            object={selectedObject}
            onObjectChange={(e) => {
                if (onObjectTransform) {
                    const position = e.target.object.position;
                    onObjectTransform(position);
                }
            }}
        />
    );
};

export default TransformController;
