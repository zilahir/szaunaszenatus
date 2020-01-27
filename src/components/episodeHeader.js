/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Img from "gatsby-image"
import {
  FaPlay as PlayIcon,
  FaExternalLinkAlt as ExternalLinkIcon,
} from "react-icons/fa"

function Header({ context, episode, image, ref }) {
  const playbtn = React.useRef(null)

  React.useEffect(() => {
    playbtn.current.focus()
  }, [])

  return (
    <header
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 400,
        backgroundImage: image
          ? "none"
          : "linear-gradient(224deg, #B298FF 0%, #7A5EFF 100%)",
        justifyContent: "flex-end",
        color: "text",
        "h1, h5": { m: 0 },
        h5: { mt: 5, fontSize: 1, opacity: 0.6 },
      }}
    >
      {image && <Img fluid={image.childImageSharp.fluid} />}
      <div
        sx={{
          position: "absolute",
          //m: 40,
          pb: 40,
          pl: 40,
          zIndex: 999,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <button
          ref={playbtn}
          sx={{
            width: 30,
            height: 30,
            background: "transparent",
            border: "1px solid",
            borderColor: "text",
            color: "text",
            fontSize: "10px",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            mr: 10,
            mt: 8,
            svg: {
              mt: 1,
              ml: 2,
            },
          }}
          onClick={() => context.setCurrentPlaying(episode)}
        >
          <PlayIcon />
        </button>
        <div>
          <h1>{episode.title}</h1>
          <h5>EP{episode.number}</h5>
        </div>
      </div>
    </header>
  )
}

export default Header
