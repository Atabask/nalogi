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
            <h1 className='@media340:header-340 text-4xl m-6 text-center'>Расчет показаний</h1>
            <p className='@media340:p-primary-340 p-primary'>Для полей ввода использовать цифры. В качестве разделителя использовать "."</p>
            <p className='@media340:p-primary-340 p-primary'>ИПУ - индивидуальный прибор учета</p>
            <div className='flex flex-col gap-4'>
                        <input className='@media340:input-primary-340 w-60 input-primary' onChange={handleChangeAmount} type='text' placeholder='Данные с ИПУ' value={amount} />
                        <input className='@media340:input-primary-340 w-60 input-primary' onChange={handleChangeRate} type='text' placeholder='Тариф' value={rate} />
                    <div className='flex @media340:flex-col gap-4 justify-center'>
                        <button className='btn-primary w-60' onClick={(() => calculate())}>Рассчитать</button>
                        <button className='btn-primary w-60' onClick={(() => remove())}>Сбросить</button>
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
