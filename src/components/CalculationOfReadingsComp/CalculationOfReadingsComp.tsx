import React, { FC, useState } from 'react';


export const CalculationOfReadingsComp: FC = () => {

    const [amount, setAmount] = useState()
    const [rate, setRate] = useState()
    const [result, setResult] = useState()



    return (
        <div className='w-4/5 flex flex-col content-center flex-wrap m-auto gap-8 p-10'>
            <h1 className='text-5xl m-14 text-center'>Расчет показаний</h1>
            <div className='flex gap-5 w-full justify-between'>
                <div className='flex flex-col gap-4'>
                    <label className='flex m-10 justify-between'>
                        <span className='text-2xl p-8'>Объём использованных ресурсов: </span>
                        <input className='p-5 text-2xl rounded-lg border-2' id='amount' type='number' placeholder='Объём' value={amount} />
                    </label>
                    <label className='flex m-10 justify-between '>
                        <span className='text-2xl p-8'>Тариф для оплаты: </span>
                        <input className='p-5 text-2xl rounded-lg border-2' type='number' placeholder='Тариф' value={rate} />
                    </label>
                </div>
                {
                    result
                        ?
                        <div>
                            <h2>Полученный рузультат: {result}</h2>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}