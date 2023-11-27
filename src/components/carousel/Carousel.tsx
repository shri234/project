// WinnerCarousel.tsx
import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

interface Winner {
  name: string;
  amountWon: number;
  imageUrl: string;
}

interface WinnerCarouselProps {
  winners: Winner[];
}

const WinnerCarousel: React.FC<WinnerCarouselProps> = ({ winners }) => {
  return (
    <>
      <Carousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        emulateTouch={true}
        centerMode={true}
        className="carousel-container"
      >
        {winners.map((winner, index) => (
          <Box component={"div"} key={index} sx={{ mt: 2 }}>
            <img
              src={winner.imageUrl}
              alt={winner.name}
              className="winner-image"
            />
            <h4>{winner.name}</h4>
            <p>Won {winner.amountWon}Rs.</p>
          </Box>
        ))}
      </Carousel>
    </>
  );
};

export default WinnerCarousel;
