import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import parse from "html-react-parser";

export default function CardBlog() {
  return (
    <StaticQuery
      query={graphql`
        query BlogQueryHighlights {
          allWpPost(limit: 2) {
            nodes {
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
        }
      `}
      render={data => (
        <section className="section section__posts--more">
          <h2 className="section__title">Blog</h2>
          <div className="section__content posts posts--grid">
            <ul className="posts__items">
              {data.allWpPost.nodes.map( article => {

                const { uri, title, featuredImage, excerpt} = article;

                const image = getImage(featuredImage.node.localFile);

                return (
                  <li key={uri} className="posts__item">
                    <Link to={uri}>
                      <article className="posts__article">
                        <GatsbyImage 
                          image={image}
                          alt={title}
                          as="figure"
                          className="posts__figure"
                          imgClassName="posts__image" 
                        />
                        <h2 className="posts__title">{parse(title)}</h2>
                        <p className="posts__excerpt">{parse(excerpt)}</p>
                        <a href={uri} className="button button__primary">LER ARTIGO</a>
                      </article>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}
    />
  )
}