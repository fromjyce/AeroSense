import "../app/globals.css";
import Navbar from "./Navbar";
import UpdateFooter from "./UpdateFooter";
import { Questrial, Poppins, Oswald, Josefin_Sans, Dela_Gothic_One, Bebas_Neue } from 'next/font/google';

const bebas_neue_init = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebas-neue' });
const questrial_init = Questrial({ subsets: ['latin'], weight: ['400'], variable: '--font-questrial' });
const poppins_init = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-poppins' });
const oswald_init = Oswald({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'], variable: '--font-oswald' });
const josefin_init = Josefin_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'], variable: '--font-josefin-sans' });
const dela_gothic_init = Dela_Gothic_One({ subsets: ['latin'], weight: ['400'], variable: '--font-dela-gothic-one' });

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${bebas_neue_init.variable} ${questrial_init.variable} ${poppins_init.variable} ${oswald_init.variable} ${josefin_init.variable} ${dela_gothic_init.variable}`}>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;