import { CallApplicationTsx } from "../../components/MessManagerApplication/callApplication";
import { CallsAndApply } from "../../components/MessManagerApplication/messApplicationResident";
import { MessManagerList } from "../../components/MessManagerApplication/messManagerList";
import { PrevCalls } from "../../components/MessManagerApplication/prevCalls";
import { PreviousExp } from "../../components/MessManagerApplication/previousMessManagerExp";
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