import Stack from "@mui/material/Stack";
import { ApplicationsQuery } from "../../../../graphql/__generated__/graphql";

import styles from "../../../../styles/seatManagementIndex.module.scss";
import Skeleton from "@mui/material/Skeleton";
import ApplicationTable from "./ApplicationTable";
import { application } from "./seatApplication";

export function ApplicationList(props: {
    applications: ApplicationsQuery["applications"]["applications"] | undefined;
    search?: React.JSX.Element;
    pagintaion?: React.JSX.Element;
    loading: boolean;
    itemOnClickHandler: (a: application) => void;
}) {
    let skeletonHeight = 80;

    return (
        <div className={styles.applicationListRoot}>
            <div className={styles.applicationListSearchBarContainer}>
                {props.search && (
                    <div className={styles.searchBarIconContainer}>
                        <img src="/search.svg" />
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
            {props.applications && (
                <div style={{ margin: 15 }}>
                    <ApplicationTable
                        applications={props.applications}
                        onClick={props.itemOnClickHandler}
                    />
                </div>
            )}

            <div className={styles.paginationConrainer}>{props.pagintaion}</div>
        </div>
    );
}
