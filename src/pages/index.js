import React from "react";
import Layout from "../components/layout";
import SlideServices from "../components/Slides/SlidesServices";
import SectionMidia from "../components/SectionMidia";
import CardBlog from "../components/Cards/CardBlog";
import SlideTestimony from "../components/Slides/SlideTestimony";
import Seo from "../components/seo";
import ImageBackground from "../images/banner-home.jpg";

const styleBackgroundImage = {
  backgroundImage: `url(${ImageBackground})`,
}
const Home = () => {
  return(
    <Layout>
      <Seo
        title=" "
        description="Uma nova maneira de pensar e agir no mercado de capitais. Acreditamos que investir é para todos."
      />
      <section className="banner banner__primary" style={styleBackgroundImage}>
        <div className="banner__content">
          <div className="banner__primary-description">
            <h1 className="banner__title">Faça seu planejamento financeiro agora</h1>
            <p className="banner__subtitle">Nosso orientador financeiro te ajudará a encontrar o título mais adequado para você atingir seu objetivo. </p>
            <div className="button__container">
              <a href="https://conteudo.be.capital/quero-investir-becapital"  target="_blank" rel="noopener noreferrer" className="button button__secondary">Simule seu investimento</a>
            </div>
          </div>
        </div>
      </section>
      <SlideServices />
      <SlideTestimony />
      <SectionMidia />
      <CardBlog />
    </Layout>
  )
}

export default Home;