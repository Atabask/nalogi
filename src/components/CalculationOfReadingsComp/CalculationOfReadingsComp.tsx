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
        <div className='w-4/5 flex flex-col content-center flex-wrap m-auto gap-8 p-10'>
            <h1 className='text-5xl m-10 text-center'>Расчет показаний</h1>
            <p className='text-4xl text-center'>Для полей ввода использовать цифры. В качестве разделителя использовать "."</p>
            <p className='text-4xl text-center'>ИПУ - индивидуальный прибор учета</p>
            <div className='flex gap-5 w-full justify-between'>
                <div className='flex flex-col gap-4'>
                    <label className='flex m-10 justify-between'>
                        <span className='text-2xl p-8'>Данные с ИПУ: </span>
                        <input className='p-5 text-2xl rounded-lg border-2' onChange={handleChangeAmount} type='text' placeholder='Объём' value={amount} />
                    </label>
                    <label className='flex m-10 justify-between '>
                        <span className='text-2xl p-8'>Тариф для оплаты: </span>
                        <input className='p-5 text-2xl rounded-lg border-2' onChange={handleChangeRate} type='text' placeholder='Тариф' value={rate} />
                    </label>
                    <div className='flex justify-center'>
                        <button className='text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200 m-9' onClick={(() => calculate())}>Рассчитать</button>
                        <button className='text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200 m-9' onClick={(() => remove())}>Сбросить</button>
                    </div>
                </div>
                {
                    result
                        ?
                        <div className='p-8 w-1/2'>
                            <h2 className='text-3xl text-center p-8'>Результат: {result}</h2>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}
