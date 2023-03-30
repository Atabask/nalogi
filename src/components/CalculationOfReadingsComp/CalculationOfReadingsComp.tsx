import React, { FC, useState } from 'react';


export const CalculationOfReadingsComp: FC = () => {

    const [amount, setAmount] = useState<string>('')
    const [rate, setRate] = useState<string>('')
    const [result, setResult] = useState<string>('')
    

    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)
    }

    const handleChangeRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRate(event.target.value)
    }

    const calculate = () => {
        const amountNumber = Number(amount)
        const rateNumber = Number(rate)

        setResult(String(amountNumber * rateNumber))
    }

    const remove = () => {
        setAmount('')
        setRate('')
        setResult('')
    }

    return (
        <div className='w-4/5 flex flex-col content-center flex-wrap m-auto gap-4 p-6'>
            <h1 className='text-4xl m-6 text-center'>Расчет показаний</h1>
            <p className='text-3xl text-center'>Для полей ввода использовать цифры. В качестве разделителя использовать "."</p>
            <p className='text-3xl text-center'>ИПУ - индивидуальный прибор учета</p>
            <div className='flex gap-4 w-full justify-between'>
                <div className='flex flex-col'>
                    <label className='flex m-8 justify-between'>
                        <span className='text-xl p-4'>Данные с ИПУ: </span>
                        <input className='input-primary' onChange={handleChangeAmount} type='text' placeholder='Объём' value={amount} />
                    </label>
                    <label className='flex m-8 justify-between '>
                        <span className='text-xl p-4'>Тариф для оплаты: </span>
                        <input className='input-primary' onChange={handleChangeRate} type='text' placeholder='Тариф' value={rate} />
                    </label>
                    <div className='flex justify-center'>
                        <button className='btn-primary w-60 m-8' onClick={(() => calculate())}>Рассчитать</button>
                        <button className='btn-primary w-60 m-8' onClick={(() => remove())}>Сбросить</button>
                    </div>
                </div>
                {
                    result
                        ?
                        <div className='p-6 w-1/2'>
                            <h2 className='text-2xl text-center p-6'>Результат: {result}</h2>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}
