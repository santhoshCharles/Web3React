import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Benefits from "../../components/Benefits/Benefits";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import Subscribe from "../../components/Subscribe/Subscribe";
import a1 from "./../../assets/images/a1.png";
import Line from "./../../assets/images/Line.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Roadmap = () => {
  useEffect(() => {
    window.scroll(0, 0)

  })
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '30%',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          centerPadding: '10%',
        }
      }
    ]
  };
  return (
    <>
      <PageTitle title="Roadmap" />
      <div className="bg-white">
        <Container className="pt-80">
          <div className="h1 pb-3 pb-md-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus cursus condimentum malesuada.
          </div>
        </Container>
        <div className="re_roadMap">
          <Slider {...settings}>
            <div>
              <img src={Line} alt="Line" />
              <div className="re_roadMapItem">
                <div className="h3 text-white pb-3">Blandit semper nisl</div>
                <div className="p3 text-white pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat. Aliquet faucibus est, tincidunt cras. </div>
                <div className="p4 text-white ">May 2021</div>
              </div>
            </div>
            <div>
              <img src={Line} alt="Line" />
              <div className="re_roadMapItem">
                <div className="h3 text-white pb-3">Blandit semper nisl</div>
                <div className="p3 text-white pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat. Aliquet faucibus est, tincidunt cras. </div>
                <div className="p4 text-white ">May 2021</div>
              </div>
            </div>
            <div>
              <img src={Line} alt="Line" />
              <div className="re_roadMapItem">
                <div className="h3 text-white pb-3">Blandit semper nisl</div>
                <div className="p3 text-white pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat. Aliquet faucibus est, tincidunt cras. </div>
                <div className="p4 text-white ">May 2021</div>
              </div>
            </div>
            <div>
              <img src={Line} alt="Line" />
              <div className="re_roadMapItem">
                <div className="h3 text-white pb-3">Blandit semper nisl</div>
                <div className="p3 text-white pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat. Aliquet faucibus est, tincidunt cras. </div>
                <div className="p4 text-white ">May 2021</div>
              </div>
            </div>

          </Slider>
        </div>
      </div>
      <div className="re_banefitSubscribe pb-60">
        <Container>
          <Benefits image1={a1} image2={a1} />
          <Subscribe />
        </Container>
      </div>
    </>
  );
};
export default Roadmap;
