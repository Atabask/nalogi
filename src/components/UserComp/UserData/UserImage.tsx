import React, { FC, ImgHTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from '@supabase/auth-helpers-react';
import supabase from "../../../supabaseClient";
import imgUser from '../../../assets/icons/png/user.png';

interface IPicture {
    picture: FileList
}

export const UserImage: FC = () => {

    const user = useUser()
    const { register, handleSubmit } = useForm<IPicture>()
    const [image, setImage] = useState<Blob>()
    const [avatar, setAvatar] = useState<string>('')
    const avatarSrc = document.getElementById('avatar') as HTMLImageElement

    const onSubmit: SubmitHandler<IPicture> = async (picture: IPicture) => {
        const avatar: any = picture.picture.item(0)                     //ИСПРАВИТЬ ТИП

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

            if (data) {
                setImage(data)
            }
        }
        if (!image) {
            getAvatarFromServer()
        } else if (avatarSrc !== null) {
            avatarSrc.src = URL.createObjectURL(image)
        }
    })

    return (
        <>
            <div>
                {image
                    ?
                    <div className="flex flex-col gap-6 relative">
                        <img width={600} height={600} className="relative" id="avatar" src={avatar} alt="Фото пользователя" />

                        <form className="absolute bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} type='file' accept='image/*' name='picture' className='text-2xl w-2/3' />
                            <button className="border-2">Изменить</button>
                        </form>
                    </div>
                    :
                    <div className="flex flex-col gap-6 relative">
                        <img width={400} height={400} id="default" className="relative" src={imgUser} alt="Фото пользователя" />
                        <form className="absolute bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} type='file' accept='image/*' name='picture' className='text-2xl w-2/3' />
                            <button className="border-2">Изменить</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}