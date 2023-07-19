import Link from 'next/link'
import { NextRouter } from 'next/router';

export  function checkRouteContains(router : NextRouter,str : string){
    return router.pathname.includes(str);
}

