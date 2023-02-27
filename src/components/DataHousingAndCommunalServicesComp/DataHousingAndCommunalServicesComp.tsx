import { useUser } from '@supabase/auth-helpers-react';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IFormInput } from '../../interfaces/interfaces';
import { formSlice } from '../../store/slices/formSlice';
import { OutputOfReadingsComp } from './OutputOfReadingsComp/OutputOfReadings';
import supabase from '../../supabaseClient';
import imgElectroBlack from '../../assets/icons/png/electroBlack.png';
import imgElectroColor from '../../assets/icons/png/electroColor.png';
import imgColdWaterBlack from '../../assets/icons/png/coldWaterBlack.png';
import imgColdWaterColor from '../../assets/icons/png/coldWaterColor.png';
import imgHotWaterBlack from '../../assets/icons/png/hotWaterBlack.png';
import imgHotWaterColor from '../../assets/icons/png/hotWaterColor.png';
import imgCheckMark from '../../assets/icons/png/checkMark.png';


export const DataHousingAndCommunalServicesComp: FC = () => {

    const user = useUser()
    const { register, handleSubmit } = useForm<IFormInput>()
    const { dataState } = useAppSelector(state => state.formReducer)
    const { addForm } = formSlice.actions
    const dispatch = useAppDispatch()

    const date = new Date()
    const year = date.getFullYear()

    const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
        dispatch(addForm(dataForm))
        const { data, error } = await supabase
            .from('communal_service')
            .insert([
                {
                    year: dataForm.year,
                    month: dataForm.month,
                    electro: dataForm.electro,
                    cold_water: dataForm.coldWater,
                    hot_water: dataForm.hotWater,
                    user_id: user?.id
                }
            ])

    }

    return (
        <div className='w-4/5 flex flex-col content-center flex-wrap m-auto gap-8 p-10'>
            {
                !user ?
                    <h1 className='text-6xl p-8 text-center'>Ввойдите в аккаунт</h1>
                    :
                    <>
                        <h1 className='text-6xl p-8 text-center'>Показания {user?.email}</h1>
                        <div className='flex gap-5 w-full justify-around'>
                            <form method='POST' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 w-1/4'>
                                <h1 className='text-4xl '>Для сохранения показаний</h1>
                                <input className='p-5 text-2xl rounded-lg border-2 ' defaultValue={year} readOnly {...register("year")} />
                                <select {...register("month")} required className='text-2xl p-5 rounded-lg border-2 '>
                                    <option className='text-2xl'>Январь</option>
                                    <option className='text-2xl'>Февраль</option>
                                    <option className='text-2xl'>Март</option>
                                    <option className='text-2xl'>Апрель</option>
                                    <option className='text-2xl'>Май</option>
                                    <option className='text-2xl'>Июнь</option>
                                    <option className='text-2xl'>Июль</option>
                                    <option className='text-2xl'>Август</option>
                                    <option className='text-2xl'>Сентябрь</option>
                                    <option className='text-2xl'>Октябрь</option>
                                    <option className='text-2xl'>Ноябрь</option>
                                    <option className='text-2xl'>Декабрь</option>
                                </select>
                                <div className='flex relative'>
                                    <input  {...register("electro")} required className='p-5 w-full text-2xl rounded-lg border-2 ' type='text' placeholder='Электричество' />
                                    {
                                        !dataState.length ?
                                            <img className='w-10 h-10 right-2 inset-y-4 absolute' src={imgElectroBlack} alt="#" />
                                            :
                                            <img className='w-10 h-10 right-2 inset-y-4 absolute' src={imgElectroColor} alt="#" />
                                    }
                                </div>
                                <div className='flex relative'>
                                    <input {...register("hotWater")} required className='p-5 w-full text-2xl rounded-lg border-2' type='text' placeholder='Горячая вода' />
                                    {
                                        !dataState.length ?
                                            <img className='w-10 h-10 right-2 inset-y-4 absolute' src={imgHotWaterBlack} alt="#" />
                                            :
                                            <img className='w-10 h-10 right-2 inset-y-4 absolute' src={imgHotWaterColor} alt="#" />
                                    }
                                </div>
                                <div className='flex relative'>
                                    <input {...register("coldWater")} required className='p-5 w-full text-2xl rounded-lg border-2' type='text' placeholder='Холодная вода' />
                                    {
                                        !dataState.length ?
                                            <img className='w-10 h-10 right-2 inset-y-4  absolute' src={imgColdWaterBlack} alt="#" />
                                            :
                                            <img className='w-10 h-10 right-2 inset-y-4  absolute' src={imgColdWaterColor} alt="#" />
                                    }
                                </div>
                                <div className='flex gap-6 items-center'>
                                    <button type='submit' className='text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200 '>Сохранить</button>
                                    {   
                                    !dataState.length ?
                                        null
                                        :
                                        <img className='w-10 h-10' src={imgCheckMark} alt="#" />  
                                    }
                                </div>
                            </form>

                            <div className='flex flex-col flex-wrap items-center'>
                                <OutputOfReadingsComp />
                            </div>
                        </div>
                    </>
            }
        </div >
    )
}
