import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { IFormInput } from '@interfaces';
import { formSlice } from '@store/slices/formSlice';
import { OutputOfReadingsComp } from './OutputOfReadingsComp/OutputOfReadings';
import supabase from '@supabaseClient';
import {
    imgElectroBlack,
    imgElectroColor,
    imgHotWaterBlack,
    imgHotWaterColor,
    imgColdWaterBlack,
    imgColdWaterColor,
    imgCheckMark
} from '@icons';
const { useUser } = require('@supabase/auth-helpers-react')


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
            if (error) throw error
    }

    return (
        <div className='@media340:container-data-communal-services-340 container-data-communal-services'>
            {
                !user ?
                    <h1 className='@media340:header-340 header text-center'>Ввойдите в аккаунт</h1>
                    :
                    <>
                        <h1 className='@media340:text-3xl header text-center'>Показания {user?.email}</h1>
                        <div className='@media340:form-data-communal-services-340 form-data-communal-services'>
                            <form method='POST' onSubmit={handleSubmit(onSubmit)} className='@media340:w-11/12 form-primary w-1/4'>
                                <h1 className='@media340:p-primary-340 text-3xl '>Для сохранения показаний</h1>
                                <input className='@media340:input-primary-340 input-primary w-10/12' defaultValue={year} readOnly {...register("year")} />
                                <select {...register("month")} required className='@media340:input-primary-340 text-xl p-3 rounded-lg border-2 w-10/12'>
                                    <option className='text-xl'>Январь</option>
                                    <option className='text-xl'>Февраль</option>
                                    <option className='text-xl'>Март</option>
                                    <option className='text-xl'>Апрель</option>
                                    <option className='text-xl'>Май</option>
                                    <option className='text-xl'>Июнь</option>
                                    <option className='text-xl'>Июль</option>
                                    <option className='text-xl'>Август</option>
                                    <option className='text-xl'>Сентябрь</option>
                                    <option className='text-xl'>Октябрь</option>
                                    <option className='text-xl'>Ноябрь</option>
                                    <option className='text-xl'>Декабрь</option>
                                </select>
                                <div className='flex relative w-10/12'>
                                    <input  {...register("electro")} required className='@media340:input-primary-340 input-primary w-full' type='text' placeholder='Электричество' />
                                    {
                                        !dataState.length ?
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgElectroBlack} alt="#" />
                                            :
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgElectroColor} alt="#" />
                                    }
                                </div>
                                <div className='flex relative w-10/12'>
                                    <input {...register("hotWater")} required className='@media340:input-primary-340 input-primary w-full' type='text' placeholder='Горячая вода' />
                                    {
                                        !dataState.length ?
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgHotWaterBlack} alt="#" />
                                            :
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgHotWaterColor} alt="#" />
                                    }
                                </div>
                                <div className='flex relative w-10/12'>
                                    <input {...register("coldWater")} required className='@media340:input-primary-340 input-primary w-full' type='text' placeholder='Холодная вода' />
                                    {
                                        !dataState.length ?
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgColdWaterBlack} alt="#" />
                                            :
                                            <img className='@media340:icon-data-primary-340 icon-data-primary' src={imgColdWaterColor} alt="#" />
                                    }
                                </div>
                                <div className='flex gap-6 items-center'>
                                    <button type='submit' className='btn-primary w-60'>Сохранить</button>
                                    {
                                        !dataState.length ?
                                            null
                                            :
                                            <img className='w-8 h-8' src={imgCheckMark} alt="#"/>
                                    }
                                </div>
                            </form>

                            <div className='@media340:w-full w-1/4 flex flex-col flex-wrap items-center'>
                                <OutputOfReadingsComp />
                            </div>
                        </div>
                    </>
            }
        </div >
    )
}
