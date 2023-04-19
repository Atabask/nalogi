import React, { FC } from "react";

interface IProps {
    children: React.ReactNode,
    onClick?: () => any,
    type?: 'submit'
}

export const Button: FC<IProps> = ({children, type, ...props}) => {

    return (
        <>
           <button className='btn-primary w-fit m-2' {...props} type='submit' >{children}</button>
        </>
    )
}