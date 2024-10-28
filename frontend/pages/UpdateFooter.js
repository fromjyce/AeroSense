import Link from "next/link";

export default function UpdateFooter() {
  return (
    <div className="update-footer-section flex justify-center items-center px-2 py-2 md:py-1">
      <h3 className="text-white text-center questrial text-sm md:text-base lg:text-lg">
        Developed by Team{" "}
        <strong>
          <Link href="#members" className="hover-link">
            Zoeo
          </Link>
        </strong>{" "}
        for{" "}
        <strong>
          <Link
            href="https://unstop.com/hackathons/buzzonearth-india-hackathon-2024-buzzonearth-1142462"
            className="hover-link"
          >
            BuzzOnEarth India Hackathon 2024
          </Link>
        </strong>
        , supported by <strong>IIT Kanpur</strong> and powered by{" "}
        <strong>Intel</strong>.
      </h3>
    </div>
  );
}