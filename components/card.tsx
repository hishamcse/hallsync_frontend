import styles from '../styles/card.module.scss'


export function Card(
    props : {
        title : string,
        body : React.JSX.Element
    }
){


    return (
        <div className={styles.root}>
            <div className={styles.header}>
                {props.title}
            </div>
            <div>
                {props.body}
            </div>
        </div>
    )
}
