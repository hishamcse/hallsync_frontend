import styles from '../styles/components.module.scss'


export function MyInput(props: {
    value: string,
    onChange: (v: string) => void,
    className? : string,
    placeHolder? : string
}) {
    return (
        <input className={styles.inputStyle + ' ' + props.className} 
        type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeHolder} />
    )
}

