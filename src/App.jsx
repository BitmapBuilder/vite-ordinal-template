import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Perf} from "r3f-perf";
import {EnvironmentLighting} from "./components/core/EnvironmentLighting.jsx";
import {Cam} from "./components/core/Cam.jsx";
import {Effects} from "./components/core/Effects.jsx";
import {TestComponent} from "./components/TestComponent.jsx";

import {GUI} from "/content/c0decdf406f2354d61b1c95be08c8d5c067f1c31371c9bf433949391c8421ba8i0";


const Scene = () => {

    return (
        <Canvas
            dpr={1}
            camera={{
                fov: 32,
                position: [4, 2, 2]
            }}
            gl={{
                alpha: false,
                depth: false,
                stencil: false,
                antialias: false,
                precision: 'highp',
            }}
        >
            <Suspense>
                <EnvironmentLighting/>
                <Cam/>
                <Effects/>
                <Perf />

                <TestComponent/>
            </Suspense>
        </Canvas>
    )
}

function App() {

    return (
        <div className="w-full h-full">
            <Scene/>
            <GUI/>
        </div>
    )
}

export default App
