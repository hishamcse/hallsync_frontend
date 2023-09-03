import { HTMLInputTypeAttribute } from 'react'
import styles from '../styles/components.module.scss'
import { CSSProperties } from '@mui/material/styles/createMixins'


export function MyInput(props: {
    value: string,
    onChange: (v: string) => void,
    className? : string,
    placeHolder? : string,
    type : HTMLInputTypeAttribute ,
    style? : CSSProperties
}) {
    return (
        <input className={styles.inputStyle + ' ' + (props.className ?? '')} 
        type={props.type}  onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeHolder ?? ''}
        style={{
            ... props.style
        }}
        
        />
    )
}

