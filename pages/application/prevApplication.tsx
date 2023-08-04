import {useQuery} from "@apollo/client";
import { MY_APPLICATIONS } from "../../graphql/operations";
import { ApplicationList } from "../seatManagement";


function Applications(){

    let {data, error, loading} = useQuery(MY_APPLICATIONS, {
        fetchPolicy: "network-only"
    })

    return (
        <div className={"contentRoot"} style = {{
            color : "white"
        }}>
            <ApplicationList applications={data?.myapplications} itemOnClickHandler={(a)=>{
                console.log(a.applicationId)     // for debugging purpose, not needed
            }} loading = {loading}  />
        </div>
    )
}

export default Applications;