import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const DirectorsSlide = () => {
  return (
    <section className="section section__directors">
      <div className="section__container">
        <h2 className="section__title">Somos BeCapital</h2>
        <p className="section__subtitle--b">A BeCapital é resultado de uma nova maneira de pensar e agir no mercado de capitais como um todo.           </p>
          <div className="directors__items">
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
            <article className="directors__item">

              {/* <StaticImage src="../../../images/dir_calebe_vieira_2x.png" alt="Foto de Calebe Vieira, Diretor Comercial da BeCapital" /> */}
              <footer className="directors__information">
                <div className="directors__description">
                  <h2 className="directors__name">Leonardo Lopes</h2>
                  <p className="directors__job">Diretor de Negócios e Financeiro</p>
                </div>
                <a href="https://www.linkedin.com/in/calebevieira/" target="_blank" rel="noopener noreferrer" className="directors__social">
                  <StaticImage src="../../../images/logo_linkedin.png" alt="logo do linkedin" />
                </a>
              </footer>
            </article>
            <article className="directors__item">

              {/* <StaticImage src="../../../images/dir_calebe_vieira_2x.png" alt="Foto de Calebe Vieira, Diretor Comercial da BeCapital" /> */}
              <footer className="directors__information">
                <div className="directors__description">
                  <h2 className="directors__name">Antonio Albuquerque</h2>
                  <p className="directors__job">Diretor de Tecnologia</p>
                </div>
                <a href="https://www.linkedin.com/in/calebevieira/" target="_blank" rel="noopener noreferrer" className="directors__social">
                  <StaticImage src="../../../images/logo_linkedin.png" alt="logo do linkedin" />
                </a>
              </footer>
            </article>
        </div>
      </div>
    </section>
  )
}

export default DirectorsSlide