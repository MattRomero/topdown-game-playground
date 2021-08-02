import React from "react";
import './FirstMap.scss';

type FirstMapProps = {
    children: React.ReactNode;
}

const FirstMap = ({children} : FirstMapProps) => {
    return (
        <div className="first-map">
            {children}
        </div>
    )
}

export default FirstMap