import {CameraControls} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";

export const Cam = () => {
    const ref = useRef()

    useEffect(() => {
        ref.current.dollyTo(5, true)
    }, [])

    useFrame(() => {
        ref.current.rotate(0.002, 0, true)
    })

    return (
        <CameraControls makeDefault ref={ref} />
    )
}
