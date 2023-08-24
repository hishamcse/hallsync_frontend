
import styles from "../../../../styles/seatManagementIndex.module.scss";
import MUISelectStyled from '../../../MUIMultiSelectCheckbox';
import { MyButton } from '../../../button';
import MyCard from '../../../card';


type FilterProps  = {
    vals : string[][],
    setVals : ((s : string[])=>void)[],
    items : string[][],
    placeHolders : string[],
    resetOnClick : ()=> void,

}

export function Filters(
    props : FilterProps
) {


    const content = (
        <div className={styles.filtersContainer}>

            {
                props.vals.map((v, i)=>(
                    <MUISelectStyled type="multiple" key={i}
                        items={props.items[i]} 
                        placeHolder={props.placeHolders[i]}
                        setVals={props.setVals[i]} 
                        vals={v} 
                    />
                ))
            }
            
            <div className={styles.filterButtonContainer}>
                <MyButton onClick={props.resetOnClick} text="Clear" type="cancel"  />
            </div> 
        </div>
    );

    return <MyCard title={"Filters"} content={content ?? <div></div>}  style={{
        maxWidth : 550
    }}/>
}
