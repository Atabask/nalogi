import { useUser } from '@supabase/auth-helpers-react';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IFormInput } from '../../interfaces/interfaces';
import { formSlice } from '../../store/slices/formSlice';
import './DataHousingAndCommunalServicesStyle.css'
import { OutputOfReadingsComp } from './OutputOfReadingsComp/OutputOfReadings';
import supabase from '../../supabaseClient';


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
        <div className='data_container'>
            <h1 className='data_header'>Показания {user?.email}</h1>
            <div className='data_container_flex'>
                <form method='POST' onSubmit={handleSubmit(onSubmit)} className='data_form'>
                    <input className='data_form_input' defaultValue={year} readOnly {...register("year")} />
                    <select {...register("month")} required className='data_form_select_month'>
                        <option className='select_month'>Январь</option>
                        <option className='select_month'>Февраль</option>
                        <option className='select_month'>Март</option>
                        <option className='select_month'>Апрель</option>
                        <option className='select_month'>Май</option>
                        <option className='select_month'>Июнь</option>
                        <option className='select_month'>Июль</option>
                        <option className='select_month'>Август</option>
                        <option className='select_month'>Сентябрь</option>
                        <option className='select_month'>Октябрь</option>
                        <option className='select_month'>Ноябрь</option>
                        <option className='select_month'>Декабрь</option>
                    </select>
                    <input {...register("electro")} className='data_form_input' type='text' placeholder='Электричество' />
                    <input {...register("hotWater")} className='data_form_input' type='text' placeholder='Горячая вода' />
                    <input {...register("coldWater")} className='data_form_input' type='text' placeholder='Холодная вода' />
                    <button type='submit' className='data_form_button'>Сохранить</button>
                </form>
                <div className='data_month_container'>
                    <h2 className='data_month'>Показания за месяц</h2>
                    <OutputOfReadingsComp dataState={dataState} />
                </div>
            </div>
        </div>
    )
}
