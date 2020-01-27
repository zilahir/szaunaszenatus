require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const axios = require("axios")
const crypto = require("crypto")
const path = require("path")
const slugify = require("@sindresorhus/slugify")
const data = require("./src/data/data.json")

axios.defaults.headers.common.Authorization = `Bearer ${process.env.SIMPLECAST_API_SECRET}`
axios.defaults.headers.common.Accept = "application/json"

exports.sourceNodes = async ({
  actions: { createNode, createNodeField },
  plugins,
}) => {
  // Get data from egghead simplecast api
  //   const { data } = await axios(
  //     `https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=20`
  //   )

  const packagePodcast = p => {
    const nodeContent = JSON.stringify(p)
    const nodeContentDigest = crypto
      .createHash("md5")
      .update(nodeContent)
      .digest("hex")
    const node = {
      ...p,
      content: nodeContent,
      internal: {
        type: "Episode",
        contentDigest: nodeContentDigest,
      },
    }

    createNode(node)
  }

  data.collection.map(packagePodcast)
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allEpisode {
        edges {
          node {
            id
            title
            number
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  data.allEpisode.edges.forEach(({ node }) => {
    actions.createPage({
      path: `show/${node.number}/${slugify(node.title)}`,
      component: path.resolve(`./src/templates/episode.js`),
      context: {
        slug: slugify(node.title),
        id: node.id,
        title: node.title,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  createNodeField({
    name: "slug",
    node,
    value: slugify(`${node.title}`),
  })
}
