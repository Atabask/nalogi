import React, { FC, useState } from 'react';
import { IGetHistory } from '@interfaces';
import { Modal } from '@components/modal/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import supabase from '@supabaseClient';
import { editImg, imgDelete } from '@icons';


interface IProps {
    dataFromSupabase: IGetHistory
}

export const HistoryCard: FC<IProps> = ({ dataFromSupabase }: IProps) => {

    const [modalActive, setModalActive] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()

    const date = new Date()
    const year = date.getFullYear()

    const onSubmit: SubmitHandler<FieldValues> = editData => {
        const updateProfile = async () => {
                const { data, error } = await supabase
                    .from('communal_service')
                    .update({
                        year: editData?.year,
                        month: editData?.month,
                        electro: editData?.electro,
                        cold_water: editData?.coldWater,
                        hot_water: editData?.hotWater,
                    })
                    .eq('id', dataFromSupabase.id)
                    window.location.reload()
                    if(error) throw error
        }
        updateProfile()
        setModalActive(false)
    }

    const deleteCard = async () => {
        const {data, error} = await supabase
        .from('communal_service')
        .delete()
        .eq('id', dataFromSupabase.id)

        if(error) throw error
    }

    return (
        <>
            <div className="flex flex-col gap-8 border-2 p-8 hover:shadow-xl duration-200 relative">
                <h2 className="text-2xl">Год: {dataFromSupabase.year}</h2>
                <h2 className="text-2xl">Месяц: {dataFromSupabase.month}</h2>
                <h2 className="text-2xl">Электроэнергия: {dataFromSupabase.electro} КВт</h2>
                <h2 className="text-2xl">Горячая воды: {dataFromSupabase.hot_water} Кубов</h2>
                <h2 className="text-2xl">Холодная вода: {dataFromSupabase.cold_water} Кубов</h2>
                <div className='flex absolute top-2 right-2'>
                    <button className=' hover:bg-sky-200 duration-200 rounded-lg p-1'>
                        <img src={editImg} alt="#" className='w-8 h-8' onClick={() => setModalActive(true)} />
                    </button>
                    <button className=' hover:bg-sky-200 duration-200 rounded-lg p-1'>
                        <img src={imgDelete} alt="#" className='w-8 h-8' onClick={() => deleteCard()} />
                    </button>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <form method='POST' onSubmit={handleSubmit(onSubmit)} className='form-primary w-full'>
                    <h1 className='text-3xl '>Для редактирования показаний</h1>
                    <input className='input-primary w-10/12' defaultValue={year} {...register("year")} />
                    <select {...register("month")} required className='text-2xl p-3 rounded-lg border-2 w-10/12'>
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
                    <input  {...register("electro")} defaultValue={dataFromSupabase.electro} required className='input-primary w-10/12' type='text' placeholder='Электричество' />
                    <input {...register("hotWater")} defaultValue={dataFromSupabase.hot_water} required className='input-primary w-10/12' type='text' placeholder='Горячая вода' />
                    <input {...register("coldWater")} defaultValue={dataFromSupabase.cold_water} required className='input-primary w-10/12' type='text' placeholder='Холодная вода' />
                    <button type='submit' className='shadow-md btn-primary'>Сохранить</button>
                </form>
            </Modal>
        </>
    )
}  