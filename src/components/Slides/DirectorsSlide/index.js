import React, { Component } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Slider from "react-slick";

export default class DirectorsSlide extends Component {
  render() {
    const settings = {
      infinite: false,
      touchMove: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 30,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      speed: 500,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            touchMove: false,
            centerPadding: 0,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            touchMove: false,
            centerPadding: 0,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return(
      <section className="section section__directors">
        <div className="section__container">
         <h2 className="section__title">Somos BeCapital</h2>
         <p className="section__subtitle--b">A BeCapital é resultado de uma nova maneira de pensar e agir no mercado de capitais como um todo.           </p>
          <div className="directors__items">
            <Slider {...settings}>
              <article className="directors__item">
                <StaticImage src="../../../images/dir_paulo_paiva_2x.png" alt="Foto de Paulo Paiva, Diretor Executivo da BeCapital" />
                <footer className="directors__information">
                  <div className="directors__description">
                    <h2 className="directors__name">Paulo Paiva</h2>
                    <p className="directors__job">CEO, Diretor Executivo</p>
                  </div>
                  <a href="https://www.linkedin.com/in/paulo-paiva-8611259b/" target="_blank" rel="noopener noreferrer" className="directors__social">
                    <StaticImage src="../../../images/logo_linkedin.png" alt="logo do linkedin" />
                  </a>
                </footer>
              </article>
              <article className="directors__item">
                <StaticImage src="../../../images/dir_tom_santos_2x.png" alt="Foto de Tom Santos, Diretor de Marketing da BeCapital" />
                <footer className="directors__information">
                  <div className="directors__description">
                    <h2 className="directors__name">Tom Santos</h2>
                    <p className="directors__job">CMO, Diretor de Marketing</p>
                  </div>
                  <a href="https://www.linkedin.com/in/washingtonsantos/" target="_blank" rel="noopener noreferrer" className="directors__social">
                    <StaticImage src="../../../images/logo_linkedin.png" alt="logo do linkedin" />
                  </a>
                </footer>
              </article>
              <article className="directors__item">
 
              <StaticImage src="../../../images/dir_calebe_vieira_2x.png" alt="Foto de Calebe Vieira, Diretor Comercial da BeCapital" />
                <footer className="directors__information">
                  <div className="directors__description">
                    <h2 className="directors__name">Calebe Vieira</h2>
                    <p className="directors__job">CAO, Diretor Comercial</p>
                  </div>
                  <a href="https://www.linkedin.com/in/calebevieira/" target="_blank" rel="noopener noreferrer" className="directors__social">
                    <StaticImage src="../../../images/logo_linkedin.png" alt="logo do linkedin" />
                  </a>
                </footer>
              </article>
            </Slider>
          </div>
        </div>
      </section>
    )
  }
}