/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { EpisodeConsumer } from "../components/context"
import { FaPlay as PlayIcon } from "react-icons/fa"
import Markdown from "react-markdown"

import Episode from "../templates/episode"

function IndexPage({ data: { allEpisode, allMarkdownRemark } }) {
  const MarkdownForLatestEpisode = allMarkdownRemark.edges.filter(
    Markdown => Markdown.node.frontmatter.id === allEpisode.nodes[0].id
  )
  return (
    <Episode
      data={{
        episode: allEpisode.nodes[0],
        markdownRemark: MarkdownForLatestEpisode[0].node,
      }}
    />
  )
}
export default IndexPage

export const indexQuery = graphql`
  query {
    episode {
      id
      title
      number
      description
      fields {
        slug
      }
    }
    markdownRemark {
      html
      frontmatter {
        id
        title
        slug
      }
    }
    allEpisode {
      totalCount
      nodes {
        id
        title
        description
        number
        enclosure_url
        fields {
          slug
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            id
            title
            slug
            resources
            guestSummary
            guestName
            guestPhoto {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image {
              childImageSharp {
                original {
                  src
                }
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
