"use client";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./about.css";
import Head from "next/head";
import UpdateFooter from "./UpdateFooter";

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const carouselSlides = [
    {
      image: "/about/first.png",
      title: "Real-Time AQI Monitoring",
      description: "Stay updated with live air quality information across metro cities. Our platform provides real-time AQI data, ensuring you’re always aware of the air you breathe."
    },
    {
      image: "/about/second.png",
      title: "AQI Forecasting",
      description: "Leverage advanced machine learning models for accurate AQI predictions. Our forecasts not only reflect current conditions but also consider factors like traffic and upcoming festivals, allowing for proactive health decisions."
    },
    {
      image: "/about/third.png",
      title: "Pollutant Simulations",
      description: "Get real-time actionable insights to make informed decisions for a cleaner and healthier environment."
    },
    {
      image: "/about/fourth.png",
      title: "AI-Driven Suggestions",
      description: "Receive tailored recommendations based on predicted pollutant levels and your location. Our AI analyzes data and suggests actions to mitigate exposure to harmful air quality."
    },
    {
      image: "/about/fifth.png",
      title: "Integrated Weather Data",
      description: "Access comprehensive weather information alongside air quality data. This integration helps users correlate weather conditions with AQI fluctuations, enhancing understanding and planning."
    },
    {
      image: "/about/sixth.png",
      title: "Transportation Impact Analysis",
      description: "Understand how various modes of transportation, including flights, trains, and driving behaviors, affect air quality. Our analysis offers insights into the contributions of transportation to local pollution levels."
    },
    {
      image: "/about/seventh.png",
      title: "Festival AQI Predictions",
      description: "Plan ahead with our unique feature that provides AQI forecasts for upcoming festivals and events. Stay informed about air quality during high-traffic times to make healthier choices for you and your family."
    },
    {
      image: "/about/eighth.png",
      title: "Health Alerts Based on AQI",
      description: "Stay safe with health alerts tailored to your area’s air quality. Our platform assesses the severity of AQI levels and notifies you of potential health risks, making it easier to take precautions for yourself and your loved ones."
    },
    {
      image: "/about/ninth.png",
      title: "Pollutant Insights & Recommendations",
      description: "Get detailed insights into major pollutants contributing to poor air quality, such as PM2.5 and CO. Learn about the main sources (e.g., industries, transportation), receive tips to reduce exposure, and understand the possible health effects associated with each pollutant. Make informed choices with our targeted recommendations."
    },
  ];
  const onSelect = () => {
    if (emblaApi) {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    }
  };

  useEffect(() => {
    if (emblaApi) {
      onSelect();
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi && emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (emblaApi) {
        emblaApi.scrollTo(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <Head>
        <title>AeroSense - About</title>
        <meta name="description" content="About AeroSense" />
      </Head>
      <div
        className="relative flex flex-col items-center justify-center h-[696px] bg-cover bg-center bg-gray-100"
        style={{ backgroundImage: "url('/misc/aerial-view.png')" }}
      >
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-white text-5xl font-bold mb-6 dela_gothic_one text-center about-title">
          AeroSense
        </h1>
        <p className="text-white text-2xl questrial font-semibold about-tagline text-center">
          Predicting a Cleaner Tomorrow
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center about-second-section">
            <h2 className="text-3xl font-bold poppins text-left mb-9">
              Empowering Cleaner, Healthier Environments
            </h2>
            <p className="text-lg text-left josefin_sans">
              <span className="font-bold">AeroSense</span> is committed to empowering users with reliable, real-time air quality predictions and actionable insights, enabling them to make informed decisions for healthier living. Our platform simplifies complex air quality metrics and forecasts to help individuals, communities, and policymakers better understand and respond to environmental challenges. By bridging data with user-friendly interfaces and cutting-edge machine learning, AeroSense promotes a future of cleaner air and healthier living environments.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/misc/first-component.webp"
              alt="Clean Environment"
              className="w-auto h-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h2 className="text-4xl font-bold poppins text-center mb-4 about-title">
          What Makes AeroSense Unique
        </h2>
        <div className="embla-container w-full max-w-4xl">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {carouselSlides.map((slide, index) => (
                <div key={index} className="embla__slide">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="mb-6 rounded-lg shadow-lg w-96 h-98"
                  />
                  <h1 className="text-3xl font-bold poppins mb-2 about-tagline">{slide.title}</h1>
                  <p className="text-lg josefin_sans text-center about-description">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex items-center justify-center">
            <video
              className="w-full h-[375px] rounded-lg shadow-lg"
              controls
              preload="metadata"
            >
              <source src="/about/video-file.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold poppins mb-4 text-left about-title">AeroSense: Our Process Explained</h2>
            <p className="text-lg text-left josefin_sans">
            Join us for a behind-the-scenes look at how AeroSense processes air quality data to deliver accurate predictions. This video guides you through our innovative backend technology and methodologies.            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
  <h2 className="text-3xl font-bold poppins mb-8 text-center about-title">Our Tools: Building AeroSpace</h2>

  <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
  <div className="flex flex-col items-center justify-center tech-box">
  <h3 className="text-2xl font-bold mb-4 poppins about-title">Intel Tech</h3>
  <div className="grid grid-cols-2 gap-4 w-full justify-items-center">
    <img src="/about/techstack/tiber.png" alt="Intel Tech 1" className="tech-icon" />
    <img src="/about/techstack/openvino.png" alt="Intel Tech 2" className="tech-icon" />
  </div>
</div>
<div className="flex flex-col items-center justify-center tech-box">
  <h3 className="text-2xl font-bold mb-4 poppins about-title">Frontend</h3>
  <div className="grid grid-cols-2 gap-4 w-full justify-items-center">
    <img src="/about/techstack/nextjs.jpg" alt="Frontend 1" className="tech-icon" />
    <img src="/about/techstack/twcss.png" alt="Frontend 2" className="tech-icon" />
  </div>
  <div className="grid grid-cols-3 gap-4 w-full mt-4 justify-items-center">
    <img src="/about/techstack/html.png" alt="Frontend 3" className="tech-icon" />
    <img src="/about/techstack/css.png" alt="Frontend 4" className="tech-icon" />
    <img src="/about/techstack/js.png" alt="Frontend 5" className="tech-icon" />
  </div>
</div>
    <div className="flex flex-col items-center justify-center tech-box">
  <h3 className="text-2xl font-bold mb-4 poppins about-title">Backend</h3>
  <div className="grid grid-cols-2 gap-4 w-full justify-items-center"> 
    <img src="/about/techstack/django.png" alt="Backend 1" className="tech-icon" />
    <img src="/about/techstack/tensorflow.png" alt="Backend 2" className="tech-icon" />
  </div>
  <div className="grid grid-cols-1 gap-4 w-full mt-4 justify-items-center">
    <img src="/about/techstack/python.png" alt="Backend 3" className="tech-icon" />
  </div>
    </div>
  </div>
</div>
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <h2 className="text-3xl font-bold poppins mb-4 text-center about-title">Hello People</h2>
      </div>
      <UpdateFooter />
    </>
  );
}