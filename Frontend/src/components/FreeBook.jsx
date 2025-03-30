import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards.jsx";
import axios from "axios";

export default function FreeBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/book");
        console.log("API Response:", res.data);
        setBooks(res.data);
      } catch (error) {
        console.log("Error in getting the data:", error);
      }
    };
    getBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true, // Infinite scrolling for a smooth loop
    speed: 800, // Smoother transition speed
    slidesToShow: 3,
    slidesToScroll: 1, // Scroll one book at a time for better control
    autoplay: true, // Auto-slide
    autoplaySpeed: 2500, // Speed for auto-sliding
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)", // Smooth animation curve
    swipeToSlide: true, // Allows users to swipe smoothly
    touchThreshold: 10, // Improves touch responsiveness
    draggable: true, // Allows drag-to-scroll effect
    pauseOnHover: true, // Stops autoplay when hovered
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="font-bold text-3xl text-white">📚 Free Offered Books</h1>
        <p className="text-gray-400 mt-2">
          Discover amazing books for free! Swipe to explore.
        </p>
      </div>

      <div className="relative group">
        <Slider {...settings}>
          {books.length > 0 ? (
            books.map((item) => <Cards item={item} key={item._id} />)
          ) : (
            <p className="text-center text-white">No free books available.</p>
          )}
        </Slider>
      </div>
    </div>
  );
}
