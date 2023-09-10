import styles from "../../../../styles/seatManagementIndex.module.scss";
import MuiDropdown from '../../../MUIDropdown';
import { MyButton } from '../../../button';
import MyCard from '../../../card';


export function SortBy(
    props : {
        vals : string[],
        setVals : ((s : string)=>void)[],
        items : string[][],
        resetOnClick : ()=> void,
        cardStyle? : React.CSSProperties
    }
) {

    let sx = {
		color: "white",
		border: "1.5px white solid",
		height: "40px",
		backgroundColor: "#111111",
        borderRadius : 1
	};

    const content = (
        <div className={styles.sortContainer}>
            {
                props.vals.map((v, i)=>(                    
                    <MuiDropdown key={i} change={(e)=>props.setVals[i](e.target.value)} 
                    options={props.items[i]} width={170} val={v} sx = {sx} />

                ))
            }
            <div className={styles.sortButtonContainer}>
                <MyButton onClick={props.resetOnClick} text="Clear" type="cancel"  />
            </div>
        </div>
    )

    return (
        <MyCard title={"Sort By"} style={{
            ... props.cardStyle
        }}>
            {content}
        </MyCard>
    )

}