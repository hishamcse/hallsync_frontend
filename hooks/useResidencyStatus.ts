import { useContext } from "react";
import { userContext } from "../pages/_app";
import { ResidencyStatus } from "../graphql/__generated__/graphql";

export default function useResidencyStatus(){

    let {user, setUser} = useContext(userContext);

    return {
            attached : user?.student?.residencyStatus == ResidencyStatus.Attached,
            resident : user?.student?.residencyStatus == ResidencyStatus.Resident,
            messManager : user?.student?.residency?.isCurrentMessManager,
            authority : user?.authority != null     
    }
}