 // auto scroll card member

 import { useEffect, useRef } from "react";
const HorizontalSlider = ({ children }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (slider) {
        slider.scrollLeft += 1;
        scrollAmount += 1;
        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
          scrollAmount = 0;
          slider.scrollLeft = 0; 
        }
      }
    };

    const intervalId = setInterval(scrollStep, 20); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={sliderRef} className="overflow-x-auto whitespace-nowrap">
      {children}
    </div>
  );
}