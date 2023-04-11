import React, { FC } from "react";

interface IProps {
    active: boolean;
    setActive: React.Dispatch<boolean>;
    children: React.ReactNode
}

export const Modal: FC<IProps> = ({ active, setActive, children }) => {

    return (
        <>
            {active
                ?
                <div className="flex items-center justify-center w-screen h-screen fixed inset-0" onClick={() => setActive(false)}>
                    <div onClick={e => e.stopPropagation()} className="p-4 rounded-lg bg-sky-100 shadow-2xl">
                        {children}
                    </div>
                </div>
                :
                null
            }
        </>
    )
}