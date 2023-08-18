import { CallApplicationTsx } from "../../components/callApplication";
import { MessManagerList } from "../../components/messManagerList";

export default function ApplicationView(){
    return (
        <div className="contentRoot">
            <MessManagerList />
            <CallApplicationTsx />
        </div>
    )
}