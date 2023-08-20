import { CallApplicationTsx } from "../../components/callApplication";
import { CallsAndApply } from "../../components/messApplicationResident";
import { MessManagerList } from "../../components/messManagerList";
import { PrevCalls } from "../../components/prevCalls";
import { PreviousExp } from "../../components/previousMessManagerExp";
import useResidencyStatus from "../../hooks/useResidencyStatus";
import styles from '../../styles/components.module.scss'

export default function ApplicationView(){
    let {
        authority,
        resident
    } = useResidencyStatus();
    return (
        <div className="contentRoot">
            <div className={styles.messAppProvost}>
                {
                    authority && 
                    <>
                        <CallApplicationTsx />
                        <PrevCalls />
                        <MessManagerList />
                    </>
                }
                {
                    resident && 
                    <>
                        <CallsAndApply />
                        <PreviousExp  />
                    </>
                }
            </div>
        </div>
    )
}