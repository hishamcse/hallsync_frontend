import { useQuery } from "@apollo/client";
import { APPLICATIONS } from "../../graphql/operations";

function Applications(){

    const {loading, data, error} = useQuery(
        APPLICATIONS
    )

    return (
        <div className={"contentRoot"} style={{
            color : "white"
        }}>
            {data && data.applications.map(a =>(<div key={a.applicationId}> {a.student.name} </div>))}
            Applications
        </div>
    )
}

export default Applications;