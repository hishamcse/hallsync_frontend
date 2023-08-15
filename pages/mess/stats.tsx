import { AbsenteesBarChart } from "../../components/AbsenteesBarChart";
import { OptInPieChart } from "../../components/OptInPieChart";
import ParticipationBarChart from "../../components/ParticipationBarChart";
import { MealPreferencesBarChart } from "../../components/PreferencesBarChart";
import styles from '../../styles/stats.module.scss'

export default function StatsView(){

    return (
        <div className="contentRoot">
            <div className={styles.rootContainer}>
                <div>
                    <OptInPieChart />
                </div>
                <div>
                    <MealPreferencesBarChart />
                </div>
                <div>
                    <ParticipationBarChart />
                </div>
                <div>
                    <AbsenteesBarChart />
                </div>
            </div>
        </div>
    )
}