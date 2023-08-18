import { CallApplicationTsx } from "../../components/callApplication";
import { MessManagerList } from "../../components/messManagerList";
import { PrevCalls } from "../../components/prevCalls";
import styles from '../../styles/components.module.scss'

export default function ApplicationView(){
    return (
        <div className="contentRoot">
            <div className={styles.messAppProvost}>
                <MessManagerList />
                <PrevCalls />
                <CallApplicationTsx />
            </div>
        </div>
    )
}