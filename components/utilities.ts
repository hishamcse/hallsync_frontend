import { NextRouter } from 'next/router';

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

export function getTimeAMPM(date : string){
    return new Date(date).toLocaleString('default',{
        hour : 'numeric',
        minute : 'numeric',
        hour12 : true
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

export const randomColorGenerator = () => {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}


export async function uploadFileToServer(files : File[]){
    
    const url = 'http://localhost:3000/upload';
    const formData = new FormData();
    files.forEach(f =>{
        formData.append('file', f);
        formData.append('filename', f.name);
    })
    let token = localStorage.getItem('token');

    let data = await fetch(url, {
        method : 'post',
        body : formData,
        headers : {
            'authorization' : 'Bearer ' + token
        }
        // ... config
    })
    let ids = await data.json();
    return ids.id;

}