import {useQuery} from "@apollo/client";
import { MY_APPLICATIONS } from "../../../graphql/operations";
import { useRouter } from "next/router";
import { ApplicationList } from "../../../components/Seat/ProvostSeat/ApplicationsList/seatApplicationsList";


function Applications(){

    const router = useRouter()
    let {data, error, loading} = useQuery(MY_APPLICATIONS, {
        fetchPolicy: "network-only"
    })

    return (
        <div className={"contentRoot"} style = {{
            color : "white"
        }}>
            <ApplicationList applications={data?.myapplications} itemOnClickHandler={(a)=>{
                console.log(a.applicationId)     // for debugging purpose, not needed
                router.push('/application/prevApplication/' + a.applicationId);
            }} loading = {loading}  />
        </div>
    )
}

export default Applications;