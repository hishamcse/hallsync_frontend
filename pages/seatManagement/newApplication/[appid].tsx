import NewSeatP from "../../../components/ProvostSeat/NewSeatP";
import {useState} from 'react'
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { GET_APPLICATION } from "../../../graphql/operations";
import { useRouter } from "next/router";

export default function NewSeatAppView(){

    const [app, setApp] = useState<ApplicationDetailsQuery['applicationDetails']>();
    const router = useRouter();
    let appid = - 1;

    if(router.query.appid && typeof(router.query.appid) === 'string' ){
        appid = parseInt(router.query.appid)
    }
    let {data, loading ,error} = useQuery(
        GET_APPLICATION,
        {
            variables : {
                applicationId : appid 
            },
            onCompleted : (d)=>{
                console.log(d)
            }
        }
    )

    return (
        <div className="contentRoot">
            {
                data &&
                <NewSeatP application={data.applicationDetails}  />
            }
        </div>
    )
}