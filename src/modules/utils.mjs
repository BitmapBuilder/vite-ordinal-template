import {useEffect} from "react";
import {guiStore} from "./stores.mjs";

let elementIdCounter = 0

// hook to add a react UI element on top of R3F scene
export const useGUI = (element) => {
    useEffect(() => {
        const key = `gui-${elementIdCounter++}`;

        const elementWithKey = { key, element };

        guiStore.set((state) => ({
            gui: [...state.gui, elementWithKey],
        }));

        return () => {
            guiStore.set((state) => ({
                gui: state.gui.filter((el) => el.key !== key),
            }));
        };
    }, [element]);

    return null;
};
