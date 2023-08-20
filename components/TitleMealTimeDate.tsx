import { Dayjs } from "dayjs"
import { MyDatePicker } from "./DatePicker"
import { MealTimeDropDown } from "./MealTimeDropDown"
import React, { ReactNode } from "react"
import styles from '../styles/components.module.scss'

export function TitleDate(props : {
    title : string
    date : Dayjs | null,
    handleDate : (newValue: Dayjs | null) => void,
    children?: ReactNode,
    datePickerLabel? : string
}){
    return (
        <div className={styles.titleDateRoot}>
            <h4>
                {props.title}
            </h4>
            <div className={styles.titleDateRootRight}>
                <div>
                    <MyDatePicker label={props.datePickerLabel} date={props.date} handleDate={props.handleDate} />
                </div>
                {props.children}
            </div>
        </div>
    )
}

export function TitleMealTimeDate(props : {
    title : string
    mealTime : string,
    setMealTime : (v : string)=>void,
    date : Dayjs | null,
    handleDate : (newValue: Dayjs | null) => void,
    children?: ReactNode,
    datePickerLabel? : string

}) {

    return (
        <TitleDate datePickerLabel={props.datePickerLabel} title={props.title} date={props.date} handleDate={props.handleDate} >
            <MealTimeDropDown setVal={props.setMealTime} val={props.mealTime} />
        </TitleDate>
    )
}