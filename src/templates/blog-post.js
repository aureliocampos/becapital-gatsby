import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {

  const image = getImage(post.featuredImage.node.localFile)


  return (
    <Layout>
      <Seo title={`${post.title} |`} description={post.excerpt} />

      <article
        className="post__single single-article"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="single-article__header">
          <GatsbyImage 
              image={image}
              alt={post.title}
              as="figure"
              className="single-article__figure"
              imgClassName="single-article__image" 
            />
        </header>

        {!!post.content && (
          <section className="single-article__main">
            <h1 className="single-article__title" itemProp="headline" >{parse(post.title)}</h1>
            <p className="single-article__excerpt">{parse(post.excerpt)}</p>
            {/* <time className="single-article__time-read" time={`00:0${readingTimeEstimated}`}>leitura de {readingTimeEstimated} min</time> */}
            <div className="single-article__content editor__style--default"  itemProp="articleBody">
              {parse(post.content)}
            </div>
          </section>
        )}
      </article>
      <section className="section more-articles">
        <div className="section__content more-articles__grid">
          <h2 className="section__title">Leia mais artigos</h2>
          <ul className="more-articles__items">
            {
              previous && (
                <li className="more-articles__item more-articles__item--previous">
                  <Link to={previous.uri}>
                    <article className="more-articles__article">
                      <GatsbyImage 
                        image={getImage(previous.featuredImage.node.localFile)}
                        alt={previous.title}
                        as="figure"
                        className="more-articles__figure"
                        imgClassName="more-articles__image" 
                      />
                      <h2 className="more-articles__title">{parse(previous.title)}</h2>
                      <p className="more-articles__excerpt">{parse(previous.excerpt)}</p>
                    </article>
                  </Link>
                </li>
              )
            }
            {
              next && (
                <li className="more-articles__item more-articles__item--next">
                  <Link to={next.uri}>
                    <article className="more-articles__article">
                      <GatsbyImage 
                        image={getImage(next.featuredImage.node.localFile)}
                        alt={next.title}
                        as="figure"
                        className="more-articles__figure"
                        imgClassName="more-articles__image" 
                      />
                      <h2 className="more-articles__title">{parse(next.title)}</h2>
                      <p className="more-articles__excerpt">{parse(next.excerpt)}</p>
                    </article>
                  </Link>
                </li>
              )
            }
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
      excerpt
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
      excerpt
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
