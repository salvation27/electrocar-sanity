import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
    //   dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    return (
      <div className="slider_wrap">
        <Slider {...settings}>
          <div className="slider_ite">
            <img src="img/slider/1.jpg" alt="" />
            <div className="slider_text">Почувствуй скорость и єкстрим</div>
          </div>
          <div className="slider_ite">
            <img src="img/slider/4.jpg" alt="" />
            <div className="slider_text">Почувствуй скорость и єкстрим</div>
          </div>
          <div className="slider_ite">
            <img src="img/slider/6.jpeg" alt="" />
            <div className="slider_text">Почувствуй скорость и єкстрим</div>
          </div>
          <div className="slider_ite">
            <img src="img/slider/8.jpg" alt="" />
            <div className="slider_text">Почувствуй скорость и єкстрим</div>
          </div>
          <div className="slider_ite">
            <img src="img/slider/2.jpg" alt="" />
            <div className="slider_text">Почувствуй скорость и єкстрим</div>
          </div>
        </Slider>
      </div>
    );
  }
}
