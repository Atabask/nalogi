import React, { FC } from "react";


interface IDataProps {
    cold_water: string,
    hot_water: string,
    electro: string,
    month: string,
    year: string,
    id: number,
    user_id: string
}

interface IProps {
    data: IDataProps
}


export const HistoryCard: FC<IProps> = ({ data }: IProps) => {

    return (
        <div className="conteiner flex flex-col gap-14 border-2 p-14 hover:shadow-xl duration-200">
            <h2 className="text-4xl">Год: {data.year}</h2>
            <h2 className="text-4xl">Месяц: {data.month}</h2>
            <h2 className="text-4xl">Электроэнергия: {data.electro} КВт</h2>
            <h2 className="text-4xl">Горячая воды: {data.hot_water} Кубов</h2>
            <h2 className="text-4xl">Холодная вода: {data.cold_water} Кубов</h2>
        </div>
    )
}  