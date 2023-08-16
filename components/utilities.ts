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
