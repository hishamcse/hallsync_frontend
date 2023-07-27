
import MyCard from '../../components/card';
import styles from '../../styles/newApplication.module.scss'


function CreateApplication(){
    return (
        <div className={"contentRoot"}>
            <MyCard content={<div> H </div>} title='Questionnaire' />
        </div>
    )
}

export default CreateApplication;