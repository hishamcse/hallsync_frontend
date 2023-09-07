import {RetrieveStudentsQuery} from "../../graphql/__generated__/graphql";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "../../styles/seatManagementIndex.module.scss";
import InfoTable from "./infoTable";

const StudentList = (props: {
    students: RetrieveStudentsQuery['retrieveStudents']['students'] | undefined;
    search?: React.JSX.Element;
    pagination?: React.JSX.Element;
    loading: boolean;
}) => {
    let skeletonHeight = 80;

    return (
        <div className={styles.applicationListRoot}>
            <div className={styles.applicationListSearchBarContainer}>
                {props.search && (
                    <div className={styles.searchBarIconContainer}>
                        <img src="/search.svg"  alt='search'/>
                    </div>
                )}
                {props.search}
            </div>

            {props.loading &&
                [1, 2, 3, 4, 5, 6, 7].map((v) => (
                    <div key={v} className={styles.loadingSkeletonContainer}>
                        <Skeleton
                            variant="rectangular"
                            height={skeletonHeight}
                        />
                    </div>
                ))}
            {props.students && (
                <div style={{ margin: 15 }}>
                    <InfoTable students={props.students}
                    />
                </div>
            )}

            <div className={styles.paginationConrainer}>{props.pagination}</div>
        </div>
    );
}

export default StudentList;