import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from '@supabase/auth-helpers-react';
import supabase from "@supabaseClient";
import { IPicture } from "@interfaces";
import { imgUser } from "@icons";


export const UserImage: FC = () => {

    const user = useUser()
    const { register, handleSubmit } = useForm<IPicture>()
    const [avatar, setAvatar] = useState<string>('')


    const onSubmit: SubmitHandler<IPicture> = async (picture: IPicture) => {
        const avatar = picture.picture.item(0) as File

        const { data, error } = await supabase
            .storage
            .from('users-avatars')
            .upload(user?.id + '/' + user?.id, avatar)
    }

    useEffect(() => {
        const getAvatarFromServer = async () => {
            const { data, error } = await supabase
                .storage
                .from('users-avatars')
                .download(user?.id + '/' + user?.id)

            if (data) setAvatar(URL.createObjectURL(data))
        }
        if (!avatar) getAvatarFromServer()
    })

    return (
        <>
            <div>
                {avatar
                    ?
                    <div className="flex flex-col gap-6 relative">
                        <img width={500} height={500} src={avatar} alt="Фото пользователя" />

                        <form className="bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} type='file' accept='image/*' name='picture' className='input-file-primary'/>
                            <button className="btn-primary">Изменить</button>
                        </form>
                    </div>
                    :
                    <div className="flex flex-col gap-6 relative">
                        <img width={500} height={500} className="relative" src={imgUser} alt="Фото пользователя" />
                        <form className="bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} type='file' accept='image/*' name='picture' className='text-2xl w-2/3' />
                            <button className="btn-primary">Изменить</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}