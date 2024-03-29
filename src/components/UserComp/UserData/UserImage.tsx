import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "@supabaseClient";
import { IPicture } from "@interfaces";
import { imgUser } from "@icons";
import { Button } from "@app/src/shared/button/Button";
const { useUser } = require('@supabase/auth-helpers-react')


export const UserImage: FC = () => {

    const user = useUser()
    const { register, handleSubmit } = useForm<IPicture>()
    const [avatar, setAvatar] = useState<string>('')
    const [file, setFile] = useState<string>('')


    const onSubmit: SubmitHandler<IPicture> = async (picture: IPicture) => {
        const avatar = picture.picture.item(0) as File

        const { data, error } = await supabase
            .storage
            .from('users-avatars')
            .upload(user?.id + '/' + user?.id, avatar)

            window.location.reload()
            if(data) {
                return null
            } else {
                throw error
            }
    }

    useEffect(() => {
        const getAvatarFromServer = async () => {
            const { data, error } = await supabase
                .storage
                .from('users-avatars')
                .download(user?.id + '/' + user?.id)

            if (data) {
                setAvatar(URL.createObjectURL(data))
            } else {
                throw error
            } 
        }
        if (!avatar) getAvatarFromServer()
    },[avatar, file, user?.id])

    return (
        <>
            <div>
                {avatar
                    ?
                    <div className="flex flex-col gap-6 relative w-full">
                        <img width={400} height={400} src={avatar} alt="Фото пользователя" />
                        <form className="bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} onChange={(e) => setFile(e.target.value)} type='file' accept='image/*' name='picture' className='input-file-primary'/>
                            {
                                file 
                                ?
                                <Button >Изменить</Button>
                                :
                                null
                            }
                        </form>
                    </div>
                    :
                    <div className="flex flex-col gap-6 relative">
                        <img width={400} height={400} className="relative" src={imgUser} alt="Фото пользователя" />
                        <form className="bottom-1 left-1" method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('picture')} onChange={(e) => setFile(e.target.value)} type='file' accept='image/*' name='picture' className='text-2xl w-2/3' />
                            {
                                file 
                                ?
                                <Button >Изменить</Button>
                                :
                                null
                            }
                        </form>
                    </div>
                }
            </div>
        </>
    )
}