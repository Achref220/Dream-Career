import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        winwidth: window.innerWidth,
        winheight: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                winwidth: window.innerWidth,
                winheight: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Runs once on mount

    return windowSize;
};

export default useWindowSize;