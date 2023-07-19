import { Card } from '../../components/card';
import styles from '../../styles/newApplication.module.scss'


function CreateApplication(){
    return (
        <div className={"contentRoot"}>
            <Card body={<div> H </div>} title='Questionnaire' />
        </div>
    )
}

export default CreateApplication;