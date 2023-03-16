import React, { FC, useState } from 'react';
import { IGetHistory } from '@interfaces';
import { Modal } from '@components/modal/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import supabase from '@supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import { editImg } from '@icons';


interface IProps {
    data: IGetHistory
}

export const HistoryCard: FC<IProps> = ({ data }: IProps) => {

    const [modalActive, setModalActive] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()
    const user = useUser()

    const date = new Date()
    const year = date.getFullYear()

    const onSubmit: SubmitHandler<FieldValues> = editData => {
        console.log(editData)
        const updateProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('communal_service')
                    .update({
                        year: editData?.year,
                        month: editData?.month,
                        electro: editData?.electro,
                        cold_water: editData?.coldWater,
                        hot_water: editData?.hotWater,
                    })
                    .eq('user_id', user?.id)
                window.location.reload()
            } catch (err) {
                throw err
            }
        }
        updateProfile()
        setModalActive(false)
    }

    return (
        <>
            <div className="conteiner flex flex-col gap-14 border-2 p-10 hover:shadow-xl duration-200 relative">
                <h2 className="text-4xl">Год: {data.year}</h2>
                <h2 className="text-4xl">Месяц: {data.month}</h2>
                <h2 className="text-4xl">Электроэнергия: {data.electro} КВт</h2>
                <h2 className="text-4xl">Горячая воды: {data.hot_water} Кубов</h2>
                <h2 className="text-4xl">Холодная вода: {data.cold_water} Кубов</h2>
                <button className='absolute top-2 right-2 hover:bg-sky-200 duration-200 rounded-lg p-1'>
                    <img src={editImg} alt="#" className='w-10 h-10' onClick={() => setModalActive(true)} />
                </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <form method='POST' onSubmit={handleSubmit(onSubmit)} className='form-primary w-full'>
                    <h1 className='text-4xl '>Для редактирования показаний</h1>
                    <input className='input-primary w-full' defaultValue={year} {...register("year")} />
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
                    <input  {...register("electro")} defaultValue={data.electro} required className='input-primary w-full' type='text' placeholder='Электричество' />
                    <input {...register("hotWater")} defaultValue={data.hot_water} required className='input-primary w-full' type='text' placeholder='Горячая вода' />
                    <input {...register("coldWater")} defaultValue={data.cold_water} required className='input-primary w-full' type='text' placeholder='Холодная вода' />
                    <button type='submit' className='shadow-md btn-primary'>Сохранить</button>
                </form>
            </Modal>
        </>
    )
}  