import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import parse from "html-react-parser"
import FormRdStation from "../components/Form";

import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

import LogoItau from "../images/logo_itau.webp";

import LogoAmil from "../images/logo_amil.webp";
import LogoBradesco from "../images/logo_bradesco-saude.webp"
import LogoGolden from "../images/logo_goldencross.webp";
import LogoNotredame from "../images/logo_notredame.webp";
import LogoSulAmerica from "../images/logo_sulamerica_saude.webp";

const clientsData = [
  {
    id:"consórcios",
    logos: [
      {
        src: LogoItau, 
        alt:"Logo Itaú Consorcio" 
      },
      {
        src:"../images/logo_porto_seguro_1x.png", 
        alt:"Logo Porto Seguro"
      },
      {
        src:"../../../images/logo_caixa_1x.png", 
        alt:"Logo Caixa"
      }
    ]
  },
  {
    id: "cambio",
    logos: [
      {
        src:"../images/logo_advanced.png", alt:"Logo Advanced"
      },
      {
        src:"../images/logo_banco_daycoval.png", alt:"Logo Banco Daycoval"
      }
    ]
  },
  {
    id: "planejamento-financeiro",
    logos: [
      {
        src:"../images/logo_itau_consorcio_1x.png", alt:"Logo Itaú Consorcio"
      },
      {
        src:"../images/logo_porto_seguro_1x.png", alt:"Logo Porto Seguro"
      },
      {
        src:"../images/logo_caixa_1x.png", alt:"Logo Caixa"
      }
    ]
  },
  {
    id: "plano-de-saude",
    logos: [
      {
        src:LogoAmil, alt:"Logo Amil"
      },
      {
        src:LogoBradesco, alt:"Logo Bradesco Saúde"
      },
      {
        src:LogoGolden, alt:"Logo Golden Cross"
      },
      {
        src:LogoNotredame, alt:"Logo Notredame"
      },
      {
        src:LogoSulAmerica, alt:"Logo Sulamerica Saúde"
      }
    ]
  },
  {
    id: "seguro-de-vida",
    logos: [
      {
        src:"../images/logo_icatu.png", alt:"Logo Icatu"
      },
      {
        src:"../images/logo_mapfre.png", alt:"Logo Mapfre"
      },
      {
        src:"../images/logo_centauro-on.png", alt:"Logo Centauro on"
      },
      {
        src:"../images/logo_metlife.png", alt:"Logo Metlife"
      },
      {
        src:"../images/logo_mongeral_aegon.png", alt:"Logo Mogeral aegon"
      },
      {
        src:"../images/logo_omint.png", alt:"Logo Omint" 
      },
      {
        src:"../images/logo_prudential.png", alt:"Logo Prudential"
      }
    ]
  }
]
const ServicesPostTemplate = ({ data: { service } }) => {

  const bannerImage = getImage(service.featuredImage.node.localFile);
  const bodyImage = getImage(service.pageFieldsServices.subBanner.imagem.localFile)

  const client = clientsData.filter( client => client.id === service.slug )
  console.log(client);
  return (
    <Layout>
      <Seo title={`${service.title} |`} description={service.seo.metaDesc} />
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
            <p className="description__text">{service.pageFieldsServices.subBanner.texto}</p>
          </div>
          <div className="single-service__partner">
            <h2 className="single-service__partner-title">Empresas Parceiras</h2>
            <ul className="single-service__partner-items">
            
            {client[0].logos.map((logo, index) => {
              return (
                <li key={index} className="single-service__partner-item">
                  <img src={logo.src} alt={logo.alt} className="single-service__partner-figure"/>
              </li>
              )
            })}
            </ul>
          </div>
          <div className="single-service__content editor__style--default">
            {parse(service.content)}
          </div>
          <div className="button__container"><a href="https://conteudo.be.capital/quero-investir-becapital" target="_blank" rel="noopener noreferrer" className="button button__secondary">Fale com um de nossos especialistas</a></div>
          
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
      slug
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
        subBanner {
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
