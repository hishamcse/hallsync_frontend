import { ApplicationsQuery } from '../../../graphql/__generated__/graphql';
import styles from '../../../styles/seatManagementIndex.module.scss'
export type application = ApplicationsQuery['applications']['applications'][0];


function getApplicaitonType(application: application) {
    if (application.newApplication)
        return 'new seat';
    else if (application.seatChangeApplication) {
        return 'room change';
    }
    return 'temp seat';
}

export function Application(props: {
    application: application,
    onClick : (a : application)=>void
}) {
    let { student } = props.application;
    let statusClassMap: any = {
        'PENDING': styles.pending,
        'ACCEPTED': styles.accepted,
        'REJECTED': styles.rejected,
    }
    return (
            <div className={styles.applicationRoot} onClick={(e) => {
                props.onClick(props.application)
            }}>
                <div className={styles.applicationRow}>
                    <div>  {student.name} </div>
                    <div> Department: {student.department.shortName} </div>
                    <div> Batch: {student.batch.year} </div>
                    <div> L/T: {student.levelTerm.label} </div>
                </div>
                <div className={styles.applicationRow}>
                    <div>
                        {student.student9DigitId}
                    </div>
                    <div>
                        Date : {new Date(props.application.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                        {getApplicaitonType(props.application)} application
                    </div>
                    <div>
                        status : <span
                        className={statusClassMap[props.application.status]}>{props.application.status}</span>
                    </div>
                </div>
            </div>
    )
}
