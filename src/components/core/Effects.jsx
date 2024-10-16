import {Bloom, EffectComposer, Vignette} from "@react-three/postprocessing";

export const Effects = () => {

    return (
        <EffectComposer multisampling={4}>
            <Bloom mipmapBlur luminanceThreshold={1.1} radius={0.72}/>
            <Vignette darkness={0.5}/>
        </EffectComposer>
    )
}
