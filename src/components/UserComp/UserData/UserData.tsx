import React, { FC, useState } from "react";
import { useUser } from '@supabase/auth-helpers-react';
import { UserImage } from "./UserImage";
import { Modal } from "../../modal/Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IUserData } from "../../../interfaces/interfaces";
import supabase from "../../../supabaseClient";

interface IProps {
    profile: IUserData
}

export const UserData: FC<IProps> = ({ profile }: IProps) => {

    const user = useUser()
    const [modalActive, setModalActive] = useState<boolean>(false)
    const {register, handleSubmit} = useForm()

    const onSubmit: SubmitHandler<FieldValues> = updateData => {
        console.log(updateData)
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

            }
        }
        updateProfile()
        setModalActive(false)
    }

    return (
        <>
            <div className='container flex gap-6'>
                <UserImage />
                <div className="flex flex-col gap-6 ">
                    <h2 className='text-3xl'>Имя: {profile.user_name}</h2>
                    <h2 className='text-3xl'>Телефон: {profile.phone}</h2>
                    <h2 className='text-3xl'>Адрес: {profile.adress}</h2>
                    <button onClick={() => setModalActive(true)} className="border-2 p-4 rounded-lg hover:bg-sky-200 duration-200 text-2xl w-60">Редактировать</button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <h1 className='text-6xl m-12'>Редактирование</h1>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-8 w-full'>
                        <input {...register("username")} className="p-5 text-2xl rounded-lg border-2 w-full" defaultValue={profile.user_name} type="text"/>
                        <input {...register("adress")} className="p-5 text-2xl rounded-lg border-2 w-full" defaultValue={profile.adress} type="text"/>
                        <input {...register("phone")} className="p-5 text-2xl rounded-lg border-2 w-full" defaultValue={profile.phone} type="tel"/>
                        <button type='submit' className="text-2xl p-5 border-2 rounded-lg w-60 hover:bg-sky-200 duration-200 shadow-md">Обновить</button>
                    </form>
                </Modal>
            </div>
        </>
    )
}


