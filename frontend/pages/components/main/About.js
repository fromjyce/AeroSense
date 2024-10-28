export default function About() {
  return (
    <div id="about" className="about-section flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
      <div className="text-content flex-1">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          <span className="questrial">About</span>
          <span className="questrial title-card"> AeroSense.</span>
        </h2>
        <p className="josefin_sans leading-relaxed text-base md:text-lg">
          <span className="aerospace-title-change">AeroSense</span> is an innovative web-based solution developed as part of the BuzzOnEarth hackathon by IIT Kanpur, powered by Intel and utilizing the Intel Tiber Cloud Developer Platform. Designed to empower users with real-time predictions and analyses of air quality across various cities and stations in India, our platform leverages advanced machine learning models to provide accurate AQI forecasts. This enables individuals and policymakers to make informed decisions for healthier living. With features like real-time monitoring, dynamic simulations, integrated weather data, and AI-driven suggestions, AeroSense transforms complex air quality metrics into actionable insights, ensuring a cleaner, safer environment for all. Read <span><a href="/about" className="more-details-about-product font-bold">More.</a></span>
        </p>
      </div>
      <div className="image-content flex flex-col md:flex-row gap-4 lg:gap-28 flex-1 items-center lg:items-end">
        <img
          src="/side-photo-1.png"
          alt="BuzzOn Earth"
          className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
        />
        <img
          src="/side-photo-2.png"
          alt="Intel"
          className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
        />
      </div>
    </div>
  );
}
