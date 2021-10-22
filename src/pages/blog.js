import React, { useEffect, useState }  from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image";


import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data }) => {

  const allPosts = data.allWpPost.nodes

  const [list, setList ] = useState([...allPosts.slice(0, 6)])

  const [loadMore, setLoadMore ] = useState(false)

  const [hasMore, setHasMore ] = useState(allPosts.length > 6)

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore
        ? allPosts.slice(currentLength, currentLength + 6)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <Layout>
      <Seo title="Blog |" />

      <section className="section section__posts">
        <h1 className="section__title">Blog</h1>
        <p className="section__subtitle">Investimos em informação pra você investir em você. Toda semana, um novo artigo sobre educação financeira e investimentos</p>
        <div className="section__content posts posts--grid">
          <ul className="posts__items">

            {list.map( article => {

              const { uri, title, featuredImage, excerpt} = article

              const image = featuredImage !== null ? getImage(featuredImage.node.localFile) :
              'url';

              return (
                <li key={uri} className="posts__item">
                 
                  <article className="posts__article">
                    <Link to={uri}>
                      {image && (
                        <GatsbyImage
                          image={image}
                          alt={title}
                          as="figure"
                          className="posts__figure"
                          imgClassName="posts__image"
                        />
                      )}
                    </Link>
                    <h2 className="posts__title">{parse(title)}</h2>
                    <p className="posts__excerpt">{parse(excerpt)}</p>
                    <Link to={uri} className="button button__primary">LER ARTIGO</Link>
                  </article>
                  
                </li>
              )
            })}

          </ul>
          {hasMore ? (
              <button onClick={handleLoadMore} className="button button__tertiary">MAIS ARTIGOS</button>
            ) : (
              <p></p>
            )}
        </div>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allWpPost(
      sort: { fields: [date], order: DESC }
      filter: {status: {eq: "publish"}}
    ) {
      nodes {
        uri
        date(formatString: "MMMM DD, YYYY")
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
        status
      }
    }
  }
`
