export default function Simulator() {
    return (
      <>
        <h3 className="text-3xl font-bold mb-2 oswald_card_title">Air Quality Simulator</h3>
        <div className="flex flex-row">
          <div className="paragraph-content w-1/2">
            <p className="text-lg josefin_sans">Explore the intricate relationship between weather, geography, and air quality with our interactive simulator. Adjust variables such as the number of cars and power plants, both with and without pollution control devices, to see firsthand how human activity influences air quality. Utilize the sliders to set various conditions and observe their impact on the Air Quality Index (AQI), where a lower number signifies cleaner air.</p>
          </div>
          <div className="iframe-container w-1/2">
            <iframe
              className="responsive-iframe"
              width="100%"
              height="300px"
              allowFullScreen={false}
              src={process.env.NEXT_PUBLIC_AIR_POLLUTION_SIMULATOR_URL}
            ></iframe>
          </div>
        </div>
      </>
    );
  }
  