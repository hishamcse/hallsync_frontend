import { CallApplicationTsx } from "../../components/callApplication";
import { MessManagerList } from "../../components/messManagerList";
import { PrevCalls } from "../../components/prevCalls";

export default function ApplicationView(){
    return (
        <div className="contentRoot">
            <MessManagerList />
            <PrevCalls />
            <CallApplicationTsx />
        </div>
    )
}