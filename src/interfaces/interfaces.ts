import type { definitions } from './../../generated-types';

export interface IDataForm {
    month: string;
    electro: string;
    hotWater: string;
    coldWater: string;
    year: string;
    user_id: string;
}

enum MonthEnum {
    january = "january",
    february = "february",
    march = "march",
    april = "april",
    may = "may",
    june = "june",
    july = "july",
    august = "august",
    september = "september",
    october = "october",
    november = "november",
    december = "december",
}

export interface IFormInput {
    month: MonthEnum;
    electro: string;
    hotWater: string;
    coldWater: string;
    year: string;
    user_id: string;
}


export interface IDataFormRegistration {
    username: string;
    email: string;
    password: string;
    adress: string;
    phone: number;
}

export interface IFormRegistration {
    username: string;
    email: string;
    password: string;
    adress: string;
    phone: number;
}

export interface IUserData {
    user_name: string;
    adress: string;
    phone: string;
}

export interface IGetHistory {
    cold_water: string,
    hot_water: string,
    electro: string,
    month: string,
    year: string,
    id: number,
    user_id: string
}

export interface IPicture {
    picture: FileList
}


export type CommunalService = definitions['communal_service']

export type Profile = definitions['profiles']