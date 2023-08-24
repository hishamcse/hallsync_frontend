import NewSeatP from "../../../components/Seat/ProvostSeat/NewSeatP";
import { useQuery } from "@apollo/client";
import { GET_APPLICATION } from "../../../graphql/operations";
import { useRouter } from "next/router";
import TempSeatP from "../../../components/Seat/ProvostSeat/TempSeatP";
import RoomChangeP from "../../../components/Seat/ProvostSeat/RoomChangeP";

export default function NewSeatAppView(){

    // const [app, setApp] = useState<ApplicationDetailsQuery['applicationDetails']>();
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
            },
            fetchPolicy : 'no-cache'
        }
    )

    return (
        <div className="contentRoot">
            {
                data && data.applicationDetails.newApplication &&
                <NewSeatP application={data.applicationDetails}  />
            }

            {
                data && data.applicationDetails.tempApplication &&
                <TempSeatP application={data.applicationDetails}  />
            }

            {
                data && data.applicationDetails.seatChangeApplication &&
                <RoomChangeP application={data.applicationDetails}  />
            }
        </div>
    )
}