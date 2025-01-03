import React,{useState,useEffect} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import list from "./list.json";
import Slider from "react-slick";
import Cards from "./Cards.jsx"
import axios from "axios";

export default function FreeBook() {

  const [book,setBook] = useState([]);
    useEffect(() =>{
        const getBook=async()=>{
            try{
                const res= await axios.get("http://localhost:4000/book");
                //console.log(res.data);
                setBook(res.data);
            } catch(error){
                console.log("Error in getting the data from :"+error);
            }
        }
        getBook();
    },[]);

    const filterData=book.filter((data)=> data.category === "Free");
    console.log(filterData);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

  return (
    <>
     <div className='max-w-screen-2x1 container mx-auto md:px-0 px-1'>
      <div>
      <h1 className='font-semibold text-2xl pd-2'>
           Free Offered Books
        </h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  
        </p>
      </div>
     
     <div>
     <Slider {...settings}>
        {filterData.map((item) => ( 
            <Cards item={item} key={item.id} />
        ))}
      </Slider>
    </div>
     </div>
    </>
    
  )
}
