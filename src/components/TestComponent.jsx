import {boxelGeometry} from "boxels";

export const TestComponent = () => {

    return (
        <mesh geometry={boxelGeometry}>
            <meshStandardMaterial flatShading color={'#ff9900'} />
        </mesh>
    )
}
