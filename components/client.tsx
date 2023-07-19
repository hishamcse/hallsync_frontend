import React from 'react';
import { useQuery } from '@apollo/client';

import { graphql } from '../types/__generated__';

// const GET_ROCKET_INVENTORY = gql(/* GraphQL */ `
//   query GetRocketInventory($year: Int!) {
//     rocketInventory(year: $year) {
//       id
//       model
//       year
//       stock
//     }
//   }
// `);

const GET_DEPTS = graphql(`
    query Departments {
        departments {
            deptCode
            name
            shortName
        }
    }
`);

export function RocketInventoryList() {
  // our query's result, data, is typed!
  const { loading, data } = useQuery(
    GET_DEPTS
  );
  console.log(data);
  return (
    <div>
      <h3>Available Inventory</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data && data.departments.map(dept => (
              <tr>
                <td>{dept.deptCode}</td>
                <td>{dept.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}