import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import parse from "html-react-parser"
import FormRdStation from "../components/Form";

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ServicesPostTemplate = ({ data: { service } }) => {

  const bannerImage = getImage(service.featuredImage.node.localFile);
  const bodyImage = getImage(service.pageFieldsServices.subbanner.imagem.localFile)


  return (
    <Layout>
      <Seo title={service.title} description={service.seo.metaDesc} />
      <article className="single-service single-service__article">
        <header className="single-service__header">
          <GatsbyImage 
            image={bannerImage}
            alt={service.title}
            as="figure"
            className="single-service__figure"
            imgClassName="single-service__image" 
          />
        </header>
        <section className="single-service__section">
          <h1 className="section__title">{parse(service.title)}</h1>
          <div className="single-service__description">
            <GatsbyImage
              image={bodyImage}
              alt={service.title}
              as="figure"
              className="single-service__body-figure"
              imgClassName="single-service__body-image" 
            />
            <p className="description__text">{service.pageFieldsServices.subbanner.texto}</p>
          </div>
          <div className="single-service__partner">
            <h2 className="single-service__partner-title">Empresas Parceiras</h2>
            <ul className="single-service__partner-items">
            
            {service.pageFieldsServices.empresasParceiras.map(logo => {
                return(
                  <li key={logo.id} className="single-service__partner-item">
                    <GatsbyImage 
                      image={getImage(logo.localFile)}
                      alt={logo.altText ? logo.altText : "Empresa Parceira"}
                      className="single-service__partner-figure"
                    />
                  </li>
                )})
                }
            </ul>
          </div>
          <div className="single-service__content editor__style--default">
            {parse(service.content)}
          </div>
          <div class="button__container"><a href="https://conteudo.be.capital/quero-investir-becapital" target="_blank" rel="noopener noreferrer" class="button button__secondary">Fale com um de nossos especialistas</a></div>
          

        </section>
        
        <footer className="single-service__footer">
          <section className="single-service__section section__form">
            <h2 className="section__title">Comece a investir agora mesmo!</h2>
            <div className="form__container">
              <div className="form__description">
                <StaticImage src="../images/icon_invista_agora.png" alt="invista agora" 
                  as="figure"
                  className="form__description-figure"
                />
                <div className="form__description-text">
                  <p className="form__description-paragraph">Este é o seu primeiro passo para começar a investir com a BeCapital.</p>
                  <p className="form__description-paragraph">Seu cadastro conosco é 100% seguro.</p>
                </div>
              </div>
              <div className="form__embed">
                <FormRdStation />
              </div>
            </div>
          </section>
        </footer>
      </article>
    </Layout>
  )
}

export default ServicesPostTemplate

export const pageQuery = graphql`
  query ServicesPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    service: wpServico(id: { eq: $id }) {
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
      pageFieldsServices {
        empresasParceiras {
          id
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        subbanner {
          imagem {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            altText
          }
          texto
        }
      }
      seo {
        metaDesc
      }
    }
  }
`
