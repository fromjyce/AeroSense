import About from "@/pages/components/main/About";
import Head from "next/head";
import Dashboard from "@/pages/components/main/Dashboard";
import Forecast from "./components/main/Forecast";
import Footer from "@/pages/components/main/Footer";

export default function Main() {
  return (
    <>
    <Head>
        <title>Aerosense</title>
        <meta name="description" content="An AI-driven air quality monitoring and prediction system." />
      </Head>
    <div>
      <About />
      <Dashboard />
      <Forecast />
      <Footer />
    </div>
    </>
  );
}
