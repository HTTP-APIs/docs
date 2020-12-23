import React from "react"
import { graphql } from 'gatsby'

const Home = ({data}) => {
    return(
        <div>
            <h1> Hello there</h1>
            {console.log(data)}
            <pre>{JSON.stringify(data.allDoczEntries.edges, undefined, 4)}</pre>
        </div>
    )
}

export default Home

export const query = graphql`
query {
    allDoczEntries {
      edges {
        node {
          link
          menu
          name
          route
        }
      }
    }
  }
`