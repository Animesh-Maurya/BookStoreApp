import React from 'react'

export default function Cards({ item }) {
    //console.log(item);

  return (
    <>
      <div className="card bg-base-100 w-92 shadow-xl mt-4 md-3 p-3 hover:scale-105 duration-200 ">
  <figure>
    <img
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p>{item.title}</p>
    <div className="card-actions justify-between">
      <div className="badge badge-outline">$ {item.price}</div>
      <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] badge badge-outline hover:bg-pink-500 hover:text-white px-2 py-2 duration-200">Buy</div>
    </div>
  </div>
</div> 
    </>
  )
}
