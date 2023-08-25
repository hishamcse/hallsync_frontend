import Link from 'next/link'
import { NextRouter } from 'next/router';
import { LoginMutation, ResidencyStatus, SelfInfoQuery } from '../graphql/__generated__/graphql';

export  function checkRouteContains(router : NextRouter,str : string){
    return router.pathname.includes(str);
}

export function getDayAndMonthString(date : string){
    return new Date(date).toLocaleString('default',{
        day : 'numeric',
        month : 'short'
    })
}

export function getDayAndMonthAndYearString(date : string){
    return new Date(date).toLocaleString('default',{
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    })
}



export function addDay(date : string){
    let dt = new Date(date)
    dt.setDate(dt.getDate() + 1)
    return dt;
}
export function addDays(date : string, days : number){
    let dt = new Date(date)
    dt.setDate(dt.getDate() + days)
    return dt;
}

export const server = "http://localhost:3000/"