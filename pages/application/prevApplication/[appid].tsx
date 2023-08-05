import {useContext} from 'react'
import { useQuery } from "@apollo/client";
import { GET_APPLICATION } from "../../../graphql/operations";
import { useRouter } from "next/router";
import NewSeat from "../../../components/StudentSeat/NewSeat";
import TempSeat from "../../../components/StudentSeat/TempSeat";
import RoomChange from "../../../components/StudentSeat/RoomChange";
import { userContext } from "../../_app";

export default function NewSeatAppViewStudent(){

    // const [app, setApp] = useState<ApplicationDetailsQuery['applicationDetails']>();
    const router = useRouter();
    let appid = - 1;
    const {user} = useContext(userContext);

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

    console.log(data);
    console.log(error);

    let room = 0
    if(user?.student?.residency?.seat.room){
        room = user.student.residency.seat.room.roomNo
    }

    return (
        <div className="contentRoot">
            {
                data && data.applicationDetails.newApplication &&
                <NewSeat changeType={()=>{}} application={data.applicationDetails}  />
            }
            
            {
                data && data.applicationDetails.tempApplication &&
                <TempSeat changeType={()=>{}} application={data.applicationDetails}  />
            }
            {
                data && data.applicationDetails.seatChangeApplication &&
                <RoomChange changeType={() => { } } application={data.applicationDetails} room={room}  />
            }
        </div>
    )
}