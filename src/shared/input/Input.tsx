import React from "react";
import { UseFormRegisterReturn } from 'react-hook-form'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegisterReturn,
    
}

export const Input = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {

    return (
        <>
            <input {...props} ref={ref} className='@media340:input-primary-340 input-primary' />
        </>
    )
})