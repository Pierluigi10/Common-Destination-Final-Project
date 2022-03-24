import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";

export const ScrollbarAnimation = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const { setScrollbarImg, setAirplanePosition, mediaQueries } = useTheme();

  useEffect(() => {
    setAirplanePosition(window.scrollY / (mediaQueries.burgerMenu ? 9.5 : 2));
  }, [scrollCount, setAirplanePosition, mediaQueries]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevCount = usePrevious(scrollCount);

  window.addEventListener("scroll", function () {
    setScrollCount(window.pageYOffset);
    if (window.scrollY === 0) {
      setScrollbarImg("stopDown");
    } else if (window.scrollY > scrollCount) {
      setScrollbarImg("down");
    } else if (window.scrollY < scrollCount && window.scrollY !== 0) {
      setScrollbarImg("up");
    }
    setTimeout(() => {
      if (scrollCount === prevCount && window.scrollY !== 0) {
        setScrollbarImg("stopUp");
      }
    }, 5000);
  });
};

export const getScrollbarImage = (scrollbar, img1, img2, img3, img4) => {
  switch (scrollbar) {
    case "stopDown":
      return img1;
    case "down":
      return img2;
    case "stopUp":
      return img3;
    case "up":
      return img4;
    default:
      return img1;
  }
};
