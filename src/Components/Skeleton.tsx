import React from "react";

const Skeleton: React.FC = () => {
    return (
        <div
            className="animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg"
            style={{ height: "280px", width: "260px" }} // Card dimensions
        />
    );
};

export default Skeleton;
