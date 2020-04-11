/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import Logo from '../images/szauna_szenatus_logo.png'
import { graphql } from "gatsby"
import { EpisodeConsumer } from "../components/context"
import {
  FaPlay as PlayIcon,
  FaExternalLinkAlt as ExternalLinkIcon,
} from "react-icons/fa"
import Link from "../components/link"
import Markdown from "react-markdown"
import spotifyIcon from "../images/spotify.svg"
import itunesIcon from "../images/apple.svg"
import spotifyImage from "../images/Spotify_Logo_RGB_Green.png"
import Header from "../components/episodeHeader"
import Icon from 'react-icons-kit'
import { instagram } from 'react-icons-kit/feather/instagram'
import { linkedin } from 'react-icons-kit/feather/linkedin'
import { github } from 'react-icons-kit/feather/github'
import { globe } from 'react-icons-kit/feather/globe'
import { droplet } from 'react-icons-kit/feather/droplet'
import { twitter } from 'react-icons-kit/feather/twitter'

function EpisodeTemplate({ data: { episode, markdownRemark } }) {
  const image = markdownRemark && markdownRemark.frontmatter.image
  console.debug('image', image)
  const markdown = markdownRemark && markdownRemark

  // const playbtn = React.useRef(null)
  // React.useEffect(() => {
  //   playbtn.current.focus()
  // }, [])

  console.debug('markdownRemark', markdownRemark)
  return (
    <EpisodeConsumer>
      {context => (
        <>
          <div sx={{ display: "flex" }}>
            <div sx={{ maxWidth: 710 }}>
              <Header context={context} episode={episode} image={image} />
              <article
                sx={{
                  p: 40,
                  pb: 100,
                  borderLeft: "2px solid",
                  borderRight: "2px solid",
                  borderColor: "background-lighten-10",
                }}
              >
                <p>{episode.description && episode.description}</p>
                {markdown && (
                  <div dangerouslySetInnerHTML={{ __html: markdown.html }} />
                )}
              </article>
            </div>
            <aside
              sx={{
                p: 40,
                width: "100%",
                maxWidth: 250,
                fontSize: "15px",
                h5: { mt: 15, mb: 10, fontSize: 3 },
                "h5:not(:first-of-type)": { mb: 10, mt: 0 },
              }}
            >
              <div
                sx={{
                  mb: 50,
                  a: { color: "text", textDecoration: "none" },
                }}
              >
                <a
                  sx={{
                    mb: 20,
                    display: "flex",
                    alignItems: "center",
                    img: { m: 0, mr: 10 },
                  }}
                  href="https://open.spotify.com/show/417L1NONwduvFydJ5WBOrP?si=DdQfUqrnTPa_oRwrKoZMeg"
                  target="_blank"
                >
                  <img src={spotifyImage} width="90" />
                </a>
              </div>
              {markdown && (
                <>
                  {markdown.frontmatter.guestName && (
                    <div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h5>Vendég</h5>

                      {markdown.frontmatter.guestPhoto && (
                        <Img
                          sx={{
                            borderRadius: 1,
                            width: "100%",
                            maxWidth: 100,
                          }}
                          fluid={
                            markdown.frontmatter.guestPhoto.childImageSharp
                              .fluid
                          }
                        />
                      )}
                      <h4 sx={{ mt: 10, mb: 5 }}>
                        {markdown.frontmatter.guestName}
                      </h4>
                      <Markdown>{markdown.frontmatter.guestSummary}</Markdown>
                    </div>
                  )}
                </>
              )}
              <>
                  <img src={Logo} alt="szauna szenátus" sx={{
                    width: 100
                  }} />
                  <h5>Mink</h5>
                  <ul>
                    <li>Ferenc Vilisics
                    <ul
                        sx={{
                          margin: 0,
                          paddingTop: '10px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <li>
                          <a target="_blank" href="https://www.instagram.com/ferencvilisics/">
                            <Icon size="1.5em" icon={instagram} />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>Richard Zilahi
                      <ul
                        sx={{
                          margin: 0,
                          paddingTop: '10px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <li>
                          <a target="_blank" href="https://www.instagram.com/richardzilahi/">
                            <Icon size="1.5em" icon={instagram} />
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://twitter.com/zilahy">
                          <Icon size="1.5em" icon={twitter} />
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://github.com/zilahir">
                            <Icon size="1.5em" icon={github} />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Icon size="1.5em" icon={linkedin} />
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="https://richardzilahi.hu">
                            <Icon size="1.5em" icon={globe} />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>Marcell Kismartoni
                    <ul
                        sx={{
                          margin: 0,
                          paddingTop: '10px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <li>
                          <a target="_blank" href="https://www.instagram.com/marzi_106/">
                            <Icon size="1.5em" icon={instagram} />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
              </>
              {markdown && markdown.frontmatter.resources && (
                <>
                  {
                    markdown.frontmatter.resources.length ? <h5>Linkek az adásból</h5> : null
                  }
                  <ul>
                    {markdownRemark.frontmatter.resources.map(resource => (
                      <li
                        sx={{
                          display: "flex",
                          a: { color: "text" },
                          svg: {
                            mt: 5,
                            mr: 5,
                            width: "100%",
                            maxWidth: 3,
                            color: "text",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <ExternalLinkIcon />
                        <Markdown>{resource}</Markdown>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </aside>
          </div>
        </>
      )}
    </EpisodeConsumer>
  )
}

export default EpisodeTemplate

export const episodeQuery = graphql`
  query($id: String!) {
    episode(id: { eq: $id }) {
      id
      title
      description
      number
      enclosure_url
      fields {
        slug
      }
    }
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        id
        title
        resources
        slug
        guestName
        guestSummary
        guestPhoto {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

// export const episodeQuery = graphql`
//   query($id: String!) {
//     episode(id: { eq: $id }) {
//       id
//       title
//       description
//     }
//   }
// `
