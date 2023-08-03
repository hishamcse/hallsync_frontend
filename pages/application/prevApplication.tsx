import { useQuery } from "@apollo/client";
import { MY_APPLICATIONS } from "../../graphql/operations";
import { Application, ApplicationList } from "../seatManagement";


function Applications(){

    let {data, error, loading} = useQuery(MY_APPLICATIONS)
    return (
        <div className={"contentRoot"} style = {{
            color : "white"
        }}>
            <ApplicationList applications={data?.myapplications} itemOnClickHandler={()=>{

            }} loading = {loading}  />
        </div>
    )
}

export default Applications;