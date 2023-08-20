import { useMutation, useQuery } from "@apollo/client"
import { GET_PENDING_FEEDBACKS, POST_FEEDBACK } from "../../graphql/operations"
import MyCard from "../card"
import { Rating, RatingProps } from "@mui/material"
import { useState } from "react"
import styles from '../../styles/components.module.scss'
import MUIStyledTextarea from "../MUITextArea"
import { PendingFeedbacksQuery } from "../../graphql/__generated__/graphql"
import { getDayAndMonthString } from "../utilities"
import { DateRangeIcon } from "@mui/x-date-pickers"
import { MyButton } from "../button"

function Rating_(props : {
    val : number | null,
    setVal : (a : number | null)=>void,
    ratingProps? : RatingProps
}){
    return (
        <Rating {...props.ratingProps} name="half-rating" defaultValue={2.5} precision={0.5}  value={props.val}
        onChange={(event, newValue) => {
          props.setVal(newValue);
        }} />
    )
}

function DateWithIcon(props : {
    date : string
}){
    return (
        <div className={styles.dateWithIconContainer} >
            <DateRangeIcon /> &nbsp;  {props.date}
        </div>
    )
}

function Feedback(props : {
    feedback : PendingFeedbacksQuery['pendingFeedbacks'][0]
}){

    const [ratings, setRatings] = useState<(number | null)[]>([null, null, null]);
    const labels = ['QUALITY','QUANTITY', 'MANAGEMENT']
    const [comment, setComment] = useState<string>();
    const [disabled, setDisabled] = useState<boolean>(false);

    let [query, {data, error}] = useMutation(
        POST_FEEDBACK
    )

    function setValIndi(i : number){

        function setVal(s : number | null){
            let cp = [... ratings]
            cp[i] = s;
            setRatings(cp);
        }
        return setVal
    }

    function submit(){
        if(ratings.some(r => r == null)){
            return;
        }
        query({
            variables : {
                feedbackId : props.feedback.feedbackId,
                ratings : {
                    array : ratings as number[]
                }
            },
            onCompleted : ()=>{
                setDisabled(true);
            }
        })
    }

    return (
        <MyCard 
        title={
            <div className={styles.feedbackTitleContainer}>
                <div>
                Rate Dining Experience
                </div>
                <DateWithIcon date={getDayAndMonthString(props.feedback.startMealPlan.day) + " - "
                + getDayAndMonthString(props.feedback.endMealPlan.day) 
                    } />    
            </div>
        }
        // title={`Rate Dining Experience (${getDayAndMonthString(props.feedback.startMealPlan.day)} - ${getDayAndMonthString(props.feedback.endMealPlan.day)})`}
        content={
            <div className={styles.feedbackContentRoot}>
                <div className={styles.ratingsContainer}>
                    {
                        labels.map((l, i) =>(
                            <div key = {l}>
                                {l} : <Rating_ ratingProps={{
                                    disabled : disabled
                                }} val={ratings[i]} setVal={setValIndi(i)} />
                            </div>
                        ))
                    }
                </div>
                <div className={styles.textFieldContainer} >
                    <MUIStyledTextarea placeHolder="Remarks" rows={6} val={comment}
                    handleInput={setComment} disabled={disabled}/>
                </div>
                <div className={styles.ratingsSubmitButtonContainer}>
                    <MyButton buttonProps={{
                        disabled : disabled
                    }} text="Submit" type="submit" onClick={submit}  />
                </div>
            </div>
        }
        style={{
            minWidth : 500
        }}
        />
    )
}

export function GiveFeedback(){

    let {data, error} = useQuery(
        GET_PENDING_FEEDBACKS,{
            fetchPolicy : "no-cache"
        }
    )

    // console.log("data", data);
    // console.log("error", error);
    return (
        data && 
        data.pendingFeedbacks.map(feedback =>(
            <div className={styles.feedbackContainer} key={Math.random().toString()}>
                <Feedback feedback={feedback} />
            </div>
        ))
    )
}