/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { jsx, Styled } from "theme-ui"
import Link from "./link"
import { EpisodeConsumer } from "./context"
import Bars from "./bars"
import { FaPlay as PlayIcon } from "react-icons/fa"

function List() {
  const data = useStaticQuery(graphql`
    query listQuery {
      allEpisode(sort: {fields: number, order: DESC}) {
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
            frontmatter {
              id
              summary
            }
          }
        }
      }
    }
  `)

  return (
    <EpisodeConsumer>
      {context => (
        <>
        <section sx={{ display: 'flex', flexDirection: ['column'] }}>
          <div sx={{ m: ['15px 0 15px 15px'] }}>
            <h1 sx={{ fontSize: 6, color: "primary", mb: 0 }}>
              Szauna Szenátus
            </h1>
            <h5
              sx={{
                textTransform: "uppercase",
                m: "10px 0",
                fontWeight: 400,
                fontSize: 1,
                opacity: 0.6,
              }}
            >
              season 01
            </h5>
          </div>

          <nav sx={{ maxWidth: ['100%', '100%', '300px'], ml: [0] }}>
            <ul role="menu">
              {data.allEpisode.nodes.map(episode => (
                <li
                  role="none"
                  key={episode.id}
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderLeft: "3px solid",
                    borderColor: "background",
                    ".active": {
                      borderLeft: "3px solid",
                      backgroundColor: "background-lighten-10",
                      borderColor:
                        context.state && episode.id === context.state.id
                          ? "primary"
                          : "primary",
                    },
                    a: {
                      p: 20,
                      pl: 20,
                      borderLeft: "3px solid",
                      borderColor: "background",
                      fontSize: 4,
                      width: "100%",
                    },
                    h4: {
                      mb: 0,
                    },
                    ":hover": {
                      a: { borderColor: "background-lighten-10" },
                      ".active": {
                        borderColor: "primary",
                      },
                      button: {
                        opacity: 1,
                        ":hover": {
                          opacity: 1,
                        },
                      },
                    },
                    button: {
                      position: "absolute",
                      opacity: 0,
                      ml: -10,
                      backgroundColor: "background",
                      border: "1px solid",
                      borderColor: "text",
                      color: "text",
                      display: "flex",
                      width: "100%",
                      maxWidth: "24px",
                      height: "24px",
                      flexGrow: "1",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      svg: { mt: 1, ml: 1 },
                      cursor: "pointer",
                    },
                  }}
                >
                  {episode.id === context.state.id && <Bars />}

                  <Link
                    role="menuitem"
                    activeClassName="active"
                    to={
                      "/show" + "/" + episode.number + "/" + episode.fields.slug
                    }
                  >
                    <h4>{episode.title}</h4>
                    {data.allMarkdownRemark.edges.map(({ node: markdown }) => {
                      if (markdown.frontmatter.id === episode.id)
                        return (
                          <p
                            sx={{
                              fontSize: 2,
                              lineHeight: 1.4,
                              fontWeight: 300,
                              opacity: 0.7,
                              mt: 10,
                            }}
                          >
                            {markdown.frontmatter.summary}
                          </p>
                        )
                      else return null
                    })}
                  </Link>

                  {episode.id !== context.state.id && (
                    <button
                      tabIndex="-1"
                      onClick={() => context.setCurrentPlaying(episode)}
                    >
                      <PlayIcon />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>
        </>
      )}
    </EpisodeConsumer>
  )
}

export default List