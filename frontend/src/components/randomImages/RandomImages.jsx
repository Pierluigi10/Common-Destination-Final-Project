import React from "react";
import { useRef, useEffect } from "react";
import img0 from "../../assets/images/airport-min1.jpg";
import img1 from "../../assets/images/airport1-min.jpg";
import img2 from "../../assets/images/airport2-min.jpg";
import img3 from "../../assets/images/airport3-min.jpg";
import img4 from "../../assets/images/airport4-min.jpg";

function RandomImages({ className }) {
  const refAppBg = useRef(null);

  const pictureArray = [img0, img1, img2, img3, img4];
  const randomIndex = Math.floor(Math.random() * pictureArray.length);
  const selectedPicture = pictureArray[randomIndex];
  // console.log(randomIndex);

  useEffect(() => {
    // console.log(selectedPicture);
    refAppBg.current.style.backgroundImage = `url(${selectedPicture})`;

    let backgroundPosition = () => {
      switch (selectedPicture) {
        case img0:
          return "50% 30%";
        case img1:
          return "50% 25%";
        case img2:
          return "50% 38%";
        case img3:
          return "50% 20%";
        case img4:
          return "50% 65%";
        default:
          return "center center";
      }
    };
    refAppBg.current.style.backgroundPosition = backgroundPosition();

    // console.log(backgroundPosition());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={className} ref={refAppBg}></div>;
}
export default RandomImages;
