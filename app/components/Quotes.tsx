import { useState, useEffect } from "react";
import * as quotesData from "~/utils/brand/quotes";

const QuotesSlider = () => {
  const quotes = quotesData;

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("translate-x-0"); // Control slide direction

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection("translate-x-full opacity-0"); // Move to the right and fade out
      setTimeout(() => {
        setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.default.length);
        setSlideDirection("translate-x-0 opacity-100"); // Reset position and fade in
      }, 500); // Half second for transition
    }, 3000); // Change quote every 3 seconds

    return () => {
      clearInterval(timer); // Clear timer on component unmount
    };
  }, [currentQuoteIndex, quotes.default.length]);

  return (
    <div className="overflow-hidden my-14 h-24">
      <p
        className={`text-white transition-transform duration-500 ease-in-out ${slideDirection}`}
      >
        {quotes.default[currentQuoteIndex]?.quote}
      </p>
    </div>
  );
};

export default QuotesSlider;
