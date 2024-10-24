import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Perf } from "r3f-perf";

import { EnvironmentLighting } from "./components/core/EnvironmentLighting.jsx";
import { Cam } from "./components/core/Cam.jsx";
import { TestBoxel } from "./components/TestBoxel.jsx";
import { GridFloor } from "./components/GridFloor.jsx";
import { Leva } from "leva";
import BoxelInfo from "./components/ui/BoxelInfo.jsx";
import ShapeTools from "./components/ui/ShapeTools.jsx";
import Shapes from "./components/Shapes.jsx";
import { Plane } from "@react-three/drei";

const SceneContent = ({ onPlaceShape, shapes }) => {
    return (
        <>
            <EnvironmentLighting/>
            <Cam/>
            <TestBoxel />
            <GridFloor />
            <Shapes shapes={shapes} />
            {/* Invisible plane for click detection */}
            <Plane 
                args={[100, 100]} 
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, 0, 0]}
                visible={false}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    const position = e.point;
                    onPlaceShape(position);
                }}
            />
            {window.innerWidth < 300 ? null : <Perf position={'bottom-left'} />}
        </>
    );
};

export function App() {
    const [shapes, setShapes] = useState([]);
    const [selectedShape, setSelectedShape] = useState(null);

    const handleShapeSelect = (shapeType) => {
        setSelectedShape(shapeType);
    };

    const handlePlaceShape = (position) => {
        if (!selectedShape) return;

        const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        
        setShapes(prevShapes => [
            ...prevShapes,
            {
                type: selectedShape,
                position: [position.x, position.y, position.z],
                color: randomColor
            }
        ]);
    };

    return (
        <div className="w-full h-full flex flex-col overflow-hidden" style={{ position: 'relative' }}>
            <Canvas
                dpr={1}
                camera={{
                    fov: 21,
                    position: [-4, 2, 2]
                }}
            >
                <color attach="background" args={[0.02, 0.02, 0.022]} />
                <Suspense>
                    <SceneContent 
                        onPlaceShape={handlePlaceShape}
                        shapes={shapes}
                    />
                </Suspense>
            </Canvas>
            <Leva hidden={window.innerWidth < 300} />
            <BoxelInfo />
            <ShapeTools onShapeSelect={handleShapeSelect} />
        </div>
    );
}

export default App;
