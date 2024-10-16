import {Canvas} from "@react-three/fiber";
import {EnvironmentLighting} from "./components/core/EnvironmentLighting.jsx";
import {Cam} from "./components/core/Cam.jsx";
import {Effects} from "./components/core/Effects.jsx";
import {useStore} from "statery";
import {guiStore} from "./modules/stores.mjs";
import {Fragment, Suspense} from "react";
import {TestComponent} from "./components/TestComponent.jsx";

import {Stats} from '@react-three/drei'


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
                <Stats />

                <TestComponent/>
            </Suspense>
        </Canvas>
    )
}

const GUI = () => {

    const {gui} = useStore(guiStore);

    return (
        <div className={'absolute top-0 left-0 z-50'}>
            {gui.map(({key, element}) => (
                <Fragment key={key}>{element}</Fragment>
            ))}
        </div>
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
