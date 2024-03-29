import React, { FC, useState } from 'react';
import { IGetHistory } from '@interfaces';
import { Modal } from '@shared/modal/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import supabase from '@supabaseClient';
import { editImg, imgDelete } from '@icons';
import { Button } from '@shared/button/Button';
import { Input } from '@shared/input/Input';


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
            if(data) {
                return null
            } else {
                throw error
            }
        }
        updateProfile()
        setModalActive(false)
    }

    const deleteCard = async () => {
        const { data, error } = await supabase
            .from('communal_service')
            .delete()
            .eq('id', dataFromSupabase.id)

            if(data) {
                return null
            } else {
                throw error
            }
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
                    <Button >
                        <img src={editImg} alt="#" className='w-8 h-8' onClick={() => setModalActive(true)} />
                    </Button>
                    <Button>
                        <img src={imgDelete} alt="#" className='w-8 h-8' onClick={() => deleteCard()} />
                    </Button>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <form method='POST' onSubmit={handleSubmit(onSubmit)} className='form-primary w-full'>
                    <h1 className='text-3xl '>Для редактирования показаний</h1>
                    <Input defaultValue={year} {...register("year")} />
                    <select {...register("month")} required className='text-2xl p-3 rounded-lg border-2 w-full'>
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
                    <Input  {...register("electro")} defaultValue={dataFromSupabase.electro} required type='text' placeholder='Электричество' />
                    <Input {...register("hotWater")} defaultValue={dataFromSupabase.hot_water} required type='text' placeholder='Горячая вода' />
                    <Input {...register("coldWater")} defaultValue={dataFromSupabase.cold_water} required type='text' placeholder='Холодная вода' />
                    <Button>Сохранить</Button>
                </form>
            </Modal>
        </>
    )
}  