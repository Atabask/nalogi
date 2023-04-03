import React, { FC, useState } from "react";
import { useUser } from '@supabase/auth-helpers-react';
import { UserImage } from "./UserImage";
import { Modal } from "@components/modal/Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IUserData } from "@interfaces";
import supabase from "@supabaseClient";

interface IProps {
    profile: IUserData
}

export const UserData: FC<IProps> = ({ profile }: IProps) => {

    const user = useUser()
    const [modalActive, setModalActive] = useState<boolean>(false)
    const {register, handleSubmit} = useForm()

    const onSubmit: SubmitHandler<FieldValues> = updateData => {
        const updateProfile = async () => {
            try {
                const { data, error } = await supabase
                .from('profiles')
                .update({
                    adress: updateData?.adress,
                    phone: updateData?.phone,
                    user_name: updateData?.username,
                })
                .eq('id', user?.id)
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
            <div className='@media340:flex-col-reverse flex gap-20'>
                <UserImage />
                <div className="@media340:items-center flex flex-col gap-6">
                    <h2 className='text-xl'>Имя: {profile.user_name}</h2>
                    <h2 className='text-xl'>Телефон: {profile.phone}</h2>
                    <h2 className='@media340:text-center text-xl'>Адрес: {profile.adress}</h2>
                    <button onClick={() => setModalActive(true)} className="btn-primary w-52">Редактировать</button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <h1 className='text-4xl m-8'>Редактирование</h1>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className='form-primary w-full'>
                        <input {...register("username")} className="input-primary w-full" defaultValue={profile.user_name} type="text"/>
                        <input {...register("adress")} className="input-primary w-full" defaultValue={profile.adress} type="text"/>
                        <input {...register("phone")} className="input-primary w-full" defaultValue={profile.phone} type="tel"/>
                        <button type='submit' className="btn-primary w-52 shadow-md">Обновить</button>
                    </form>
                </Modal>
            </div>
        </>
    )
}