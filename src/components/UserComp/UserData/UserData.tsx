import React, { FC, useState } from "react";
import { UserImage } from "./UserImage";
import { Modal } from '@shared/modal/Modal';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IUserData } from "@interfaces";
import supabase from "@supabaseClient";
import { Button } from "@shared/button/Button";
import { Input } from "@shared/input/Input";
const { useUser } = require('@supabase/auth-helpers-react')

interface IProps {
    profile: IUserData
}

export const UserData: FC<IProps> = ({ profile }: IProps) => {

    const user = useUser()
    const [modalActive, setModalActive] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()

    const onSubmit: SubmitHandler<FieldValues> = updateData => {
        const updateProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    adress: updateData?.adress,
                    phone: updateData?.phone,
                    user_name: updateData?.username,
                })
                .eq('id', user?.id)
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

    return (
        <>
            <div className='@media340:flex-col-reverse flex gap-20'>
                <UserImage />
                <div className="@media340:items-center flex flex-col gap-6">
                    <h2 className='text-xl'>Имя: {profile.user_name}</h2>
                    <h2 className='text-xl'>Телефон: {profile.phone}</h2>
                    <h2 className='@media340:text-center text-xl'>Адрес: {profile.adress}</h2>
                    <Button onClick={() => setModalActive(true)}>Редактировать</Button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <h1 className='text-4xl m-8'>Редактирование</h1>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className='form-primary w-full'>
                        <Input {...register("username")} defaultValue={profile.user_name} type="text" />
                        <Input {...register("adress")} defaultValue={profile.adress} type="text" />
                        <Input {...register("phone")} defaultValue={profile.phone} type="tel" />
                        <Button>Обновить</Button>
                    </form>
                </Modal>
            </div>
        </>
    )
}