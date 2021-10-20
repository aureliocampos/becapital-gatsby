import React, { Component } from "react";
import Slider from "react-slick";
import { StaticImage } from "gatsby-plugin-image";


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
      <svg width="41" height="43" viewBox="0 0 41 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <rect x="28.7607" y="30" width="16.521" height="16.9999" rx="8.26051" transform="rotate(-180 28.7607 30)" fill="white"/>
        </g>
        <path d="M22.7421 21.7875C22.9502 21.5794 22.9502 21.2419 22.7421 21.0338L19.3505 17.6422C19.1424 17.4341 18.8049 17.4341 18.5968 17.6422C18.3887 17.8503 18.3887 18.1878 18.5968 18.3959L21.6115 21.4106L18.5968 24.4254C18.3887 24.6335 18.3887 24.9709 18.5968 25.1791C18.8049 25.3872 19.1424 25.3872 19.3505 25.1791L22.7421 21.7875ZM22.1876 21.9436L22.3652 21.9436L22.3652 20.8777L22.1876 20.8777L22.1876 21.9436Z" fill="#1A4A73"/>
        <defs>
        <filter id="filter0_d" x="0.0280638" y="0.788806" width="40.9434" height="41.4223" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="6.1056"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
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
      <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <rect x="13" y="13" width="16.521" height="16.9999" rx="8.26051" fill="white"/>
        </g>
        <path d="M19.0187 21.2125C18.8105 21.4206 18.8105 21.7581 19.0187 21.9662L22.4103 25.3578C22.6184 25.5659 22.9558 25.5659 23.1639 25.3578C23.3721 25.1497 23.3721 24.8122 23.1639 24.6041L20.1492 21.5894L23.1639 18.5746C23.3721 18.3665 23.3721 18.0291 23.1639 17.8209C22.9558 17.6128 22.6184 17.6128 22.4103 17.8209L19.0187 21.2125ZM19.5732 21.0564H19.3955V22.1223H19.5732V21.0564Z" fill="#1A4A73"/>
        <defs>
        <filter id="filter0_d" x="0.788806" y="0.788806" width="40.9434" height="41.4223" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="6.1056"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>
      
    </div>

  );
}

export default class AdvantageClub extends Component {

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      fade: true,
      speed: 500,
      dots: false,
      arrows: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
  }
  return(
    <section className="section section__advantage">
      <h2 className="section__title">Conheça o Clu<mark>Be</mark> de vantagens!</h2>
      <div className="advantage__items">
        <div className="advantage__item">
          <div className="advantage__button">
            <StaticImage src="../../images/discount-coupon.png" alt="Ícone de Descontos em restaurantes e cursos" />
            <h3 className="advantage__title">Descontos em restaurantes e cursos</h3>
            <br/>
          </div>
          <div id="float1" className="advantage__slide-container">
            <div className="advantage__slide-custom">
              <StaticImage src="../../images/image_descount_hover.png" alt="Ícone de Descontos em restaurantes e cursos" />
            </div>
          </div>

        </div>
        <div className="advantage__item">
          <div className="advantage__button">
            <a href="https://site.gympass.com/br" target="_blank" rel="noopener noreferrer">
              <StaticImage src="../../images/logo_gympass.png" alt="Ícone de Descontos em restaurantes e cursos" />
            </a>
            <h3 className="advantage__title">Modo #BeFit ativado para qualidade de vida e bem-estar!</h3>
          </div>
        </div>
        <div className="advantage__item">
          <div className="advantage__button">
            <StaticImage src="../../images/beoffice.png" alt="Ícone de Descontos em restaurantes e cursos" />
            <h3 className="advantage__title">BeOffice<br/>
            <br/></h3>  
          </div>

          
          <div id="float2" className="advantage__slide-container">
            <div className="advantage__slide-custom">
              <Slider {...settings} >
                <StaticImage src="../../images/image_copa_full.png" alt="Uma copa pra chamar de nossa" />
                <StaticImage src="../../images/image_luz_camera_acao_full.png" alt="Um estúdio Luz, Camera e Ações para brilhar no conteúdo" />
                <StaticImage src="../../images/image_troca_copartilhar_full.png" alt="Um espaço café para trocar ideias e compartilhar" />
                <StaticImage src="../../images/image_beclioteca_full.png" alt="Uma Beblioteca colaborativa cheia de plantinhas" />
                <StaticImage src="../../images/image_receber_todos_full.png" alt="E salas criativas e acolhedoras para receber todos!" />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
}