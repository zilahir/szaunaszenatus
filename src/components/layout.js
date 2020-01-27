/** @jsx jsx */
import React from "react"
import PropTypes from "prop-types"
import List from "./list"
import "./layout.css"
import { jsx, Layout as Wrapper, Container } from "theme-ui"

function Layout({ children }) {
  return (
    <Wrapper>
      <Container
        sx={{
          p: 0,
          display: "flex",
          flexGrow: "1",
        }}
      >
        <List />

        <main sx={{ width: "100%", marginLeft: 20 }}>{children}</main>
      </Container>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
