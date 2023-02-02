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