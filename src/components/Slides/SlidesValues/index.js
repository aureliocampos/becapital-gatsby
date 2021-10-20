import { StaticImage } from "gatsby-plugin-image";
import React, { Component } from "react";
import Slider from "react-slick";




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
      <svg width="171" height="173" viewBox="0 0 171 173" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <rect x="120" y="122" width="69" height="71" rx="19" transform="rotate(-180 120 122)" fill="white"/>
        </g>
        <path d="M98.1213 88.1213C99.2929 86.9497 99.2929 85.0503 98.1213 83.8787L79.0294 64.7868C77.8579 63.6152 75.9584 63.6152 74.7868 64.7868C73.6152 65.9584 73.6152 67.8579 74.7868 69.0294L91.7574 86L74.7868 102.971C73.6152 104.142 73.6152 106.042 74.7868 107.213C75.9584 108.385 77.8579 108.385 79.0294 107.213L98.1213 88.1213ZM95 89L96 89L96 83L95 83L95 89Z" fill="#1A4A73"/>
        <defs>
        <filter id="filter0_d" x="0" y="0" width="171" height="173" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="25.5"/>
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
      <svg width="171" height="173" viewBox="0 0 171 173" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <rect x="51" y="50.9995" width="69" height="71" rx="19" fill="white"/>
        </g>
        <path d="M72.8787 84.8782C71.7071 86.0498 71.7071 87.9493 72.8787 89.1208L91.9706 108.213C93.1421 109.384 95.0416 109.384 96.2132 108.213C97.3848 107.041 97.3848 105.142 96.2132 103.97L79.2426 86.9995L96.2132 70.0289C97.3848 68.8574 97.3848 66.9579 96.2132 65.7863C95.0416 64.6147 93.1421 64.6147 91.9706 65.7863L72.8787 84.8782ZM76 83.9995H75V89.9995H76V83.9995Z" fill="#1A4A73"/>
        <defs>
        <filter id="filter0_d" x="0" y="-0.000488281" width="171" height="173" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="25.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
      </svg>
    </div>

  );
}


export default class SlidesValuesBecapital extends Component {
  render() {
    const pagingItems = [
      { id: 1, text: 'Ética e Respeito'}, 
      { id: 2, text: 'Excelência e qualidade nas entregas'},
      { id: 3, text: 'Resultados de alta performance'},
      { id: 4, text: 'Senso de colaboração'},
      { id: 5, text: 'Autonomia com responsabilidade'},
      { id: 6, text: 'Pensamento e ação como sócio'},
    ]
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      appendDots: dots => (
        <div className="custom-dots__container">
          <ul className="custom-dots__items">{dots}</ul>
        </div>
      ),
      customPaging: i => (
        <h3>
          {pagingItems.map( item => {
            if ((i + 1) === item.id) {
              return item.text;
            }
            return '' // para remover o erro no console, em que reforça que o map precisa retornar algum valor
          })}
        </h3>
      )
    };
    return (
      <section className="section section__slide-values">
        <h2 className="section__title">Nossos valores</h2>
        <div className="section__slide-container">
          <Slider {...settings}>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_etica_e_respeito_full.jpg" alt="Ética e Respeito" className="slide-values__image"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Ética e Respeito</h2>
                <p className="slide-values__text">Prezamos pelo compromisso ético entre empresa e os colaboradores. Respeitar as diferenças, vivências e experiências faz parte da nossa cultura, que preza pela pluralidade. Evitamos levantar bandeiras sócio-políticas, e manifestações religiosas. As diferenças nos unem e, por isso, adotamos a imparcialidade no que diz respeito à crença, política e religião.</p> 
              </div>
            </article>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_excelencia_e_qualidade_full_2x.jpg" alt="Excelência e qualidade nas entregas" className="slide-values__image"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Excelência e qualidade nas entregas</h2>
                <p className="slide-values__text">Priorizamos a qualificação em todos os processos: embasamento das ideias e argumentos, desenvolvimento técnico, aprendizagem constante, compromisso com prazos e mensuração dos resultados.</p> 
              </div>
            </article>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_resultado_de_alta_performance_full_2x.jpg" alt="Resultados de alta performance" className="slide-values__image"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Resultados de alta performance</h2>
                <p className="slide-values__text">Somamos conhecimento para multiplicar sonhos. Nosso compromisso é com resultados e entregas que vão além do esperado e do trivial.</p> 
              </div>    
            </article>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_senso_de_colaboração_full.jpg" alt="Senso de colaboração" className="slide-values__image"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Senso de colaboração</h2>
                <p className="slide-values__text">Uma empresa forte tem uma marca forte. E ambas só são possíveis porque há um trabalho de equipe baseado em trocas produtivas e na colaboração entre todos os membros e todas as áreas.</p> 
              </div>
            </article>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_autonomia_com_responsabilidade_full.jpg" alt="Autonomia com responsabilidade" className="slide-values__image" objectPosition="top"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Autonomia com responsabilidade</h2>
                <p className="slide-values__text">Raras são as empresas que dão autonomia para seus colaboradores, independente do nível hierárquico. Na BeCapital, acreditamos que o sucesso acontece a partir do protagonismo de seus BeCapitals na proposição de ideias, projetos e melhorias. Autonomia com responsabilidade é reconhecer a capacidade de cada colaborador.</p> 
              </div>
            </article>
            <article className="slide-values__card"> 
              <StaticImage src="../../../images/foto_pensamento_e_acao_com_socio_full.jpg" alt="Pensamento e ação como sócio" className="slide-values__image" objectPosition="top"/>
              <div className="slide-values__description">
                <h2 className="slide-values__title">Pensamento e ação como sócio</h2>
                <p className="slide-values__text">“Eu sou porque nós somos”. A proatividade de um BeCapital é amplamente incentivada para projetar todo o time em oportunidades executivas e estratégicas.</p> 
              </div>
            </article>
          </Slider>
        </div>
      </section>
    );
  }
}