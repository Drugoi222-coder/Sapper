import "./counter.css";
import images from "../images/images";
import { nanoid } from "@reduxjs/toolkit";
import { FC, useCallback } from "react";

interface IProps {
    renderDigits: Function;
}

const { digits } = images;

const withCounter = (Component: FC<IProps>) => () => {
    const renderDigits = useCallback((count: number) => {
        const arrayDigits = Array.from(String(count));
        const arrayLength = arrayDigits.length;

        if (arrayLength < 3) {
            const diff = 3 - arrayLength;
            arrayDigits.unshift(...new Array(diff).fill("0"));
        }

        return arrayDigits.map((item) => (
            <img
                src={digits[Number(item)]}
                key={nanoid()}
                alt="digit"
                className="counter__digit"
            />
        ));
    }, []);

    return <Component renderDigits={renderDigits} />;
};

export default withCounter;
