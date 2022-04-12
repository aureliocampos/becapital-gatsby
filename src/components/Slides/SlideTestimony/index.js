import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";
import parse from "html-react-parser"


function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <svg width="30" height="71" viewBox="0 0 41 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.0628 38.7462C40.9083 36.9007 40.9083 33.9086 39.0628 32.0631L8.98884 1.98915C7.14335 0.143661 4.15122 0.143661 2.30573 1.98915C0.460247 3.83464 0.460247 6.82676 2.30573 8.67225L29.0381 35.4047L2.30573 62.1371C0.460247 63.9826 0.460247 66.9747 2.30573 68.8202C4.15122 70.6657 7.14335 70.6657 8.98884 68.8202L39.0628 38.7462ZM29.9454 40.1303H35.7213V30.679H29.9454V40.1303Z" fill="#1A4A73"/>
      </svg>
    
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <svg width="30" height="71" viewBox="0 0 41 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.32855 32.0631C0.483066 33.9086 0.483066 36.9007 2.32855 38.7462L32.4025 68.8202C34.248 70.6657 37.2401 70.6657 39.0856 68.8202C40.9311 66.9747 40.9311 63.9826 39.0856 62.1371L12.3532 35.4047L39.0856 8.67225C40.9311 6.82676 40.9311 3.83464 39.0856 1.98915C37.2401 0.143661 34.248 0.143661 32.4025 1.98915L2.32855 32.0631ZM13.0211 30.679H5.6701V40.1303H13.0211V30.679Z" fill="#1A4A73"/>
      </svg>
    </div>

  );
}
export default class SlideTestimony extends Component {
  render() {
    const settings = {
      infinite: true,
      touchMove: true,
      centerPadding: 30,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      dots: true,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return(
      <StaticQuery 
        query={graphql`
          query testimonies {
            allWpDepoimento {
              nodes {
                id
                title
                content
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

        <section className="section section__testimonies">
          <div className="section__container">
            <h2 className="section__title">Quem já soma</h2>
              <ul className="testimonies__items">
                <Slider {...settings}>
                  {
                    data.allWpDepoimento.nodes.map( testimony => {
                      const { id, title, content, featuredImage } = testimony;
                      const img = getImage(featuredImage?.node.localFile);

                      return(
                        <li key={id} className="testimonies__item">
                          <article className="testimonies__card">
                            <header className="testimonies__header">
                              <div className="testimonies__header--sub">
                                <GatsbyImage 
                                  image={img} 
                                  alt={title} 
                                  as="figure" 
                                  className="testimonies__figure" 
                                  imgClassName="testimonies__image"
                                />
                                <span>
                                  <h2 className="testimonies__name">{parse(title)}</h2>
                                  <small className="testimonies__description">Cliente BeCapital</small>
                                </span>
                              </div>
                              <StaticImage src="../../../images/icon_bullets_menu.png" alt="icone de menu" />
                            </header>
                            <section className="testimonies__text">
                              <p className="testimonies__text--site">Como é investir na BeCapital?</p>
                              <div className="testimonies__text--client">
                                {parse(content)}
                              </div>
                            </section>
                          </article>
                        </li>
                      )
                    })
                  }
                </Slider>
              </ul>
            <div className="button__container">
              <a href="https://conteudo.be.capital/quero-investir-becapital" className="button button__secondary" target="_blank" rel="noopener noreferrer">Quero Investir</a>
            </div>
          </div>
        </section>
      
      )}
      />
    )
  }
}
