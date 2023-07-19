import { graphql } from '../graphql/__generated__';

export const GET_DEPTS = graphql(`
    query Departments {
        departments {
            deptCode
            name
            shortName
        }
    }
`);