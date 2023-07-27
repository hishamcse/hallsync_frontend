import { HTMLInputTypeAttribute } from 'react'
import styles from '../styles/components.module.scss'


export function MyInput(props: {
    value: string,
    onChange: (v: string) => void,
    className? : string,
    placeHolder? : string,
    type : HTMLInputTypeAttribute 
}) {
    return (
        <input className={styles.inputStyle + ' ' + (props.className ?? '')} 
        type={props.type}  onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeHolder ?? ''}
         />
    )
}

