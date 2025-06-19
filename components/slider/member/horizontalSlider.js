import { useEffect, useRef } from "react";

const HorizontalSlider = ({ children }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    let direction = 1;

    const scrollStep = () => {
      if (slider) {
        slider.scrollLeft += direction;
        scrollAmount += direction;
        // Reverse direction at the ends for a smoother loop
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          direction = -1;
        }
        if (slider.scrollLeft <= 0) {
          direction = 1;
        }
      }
    };

    const intervalId = setInterval(scrollStep, 20);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={sliderRef}
      className="overflow-x-auto whitespace-nowrap scrollbar-hide"
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
    </div>
  );
};

export default HorizontalSlider;