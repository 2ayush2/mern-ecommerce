import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span className="flex">
        {value >= 1 ? <FaStar className="text-yellow-500" /> : value >= 0.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
        {value >= 2 ? <FaStar className="text-yellow-500" /> : value >= 1.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
        {value >= 3 ? <FaStar className="text-yellow-500" /> : value >= 2.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
        {value >= 4 ? <FaStar className="text-yellow-500" /> : value >= 3.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
        {value >= 5 ? <FaStar className="text-yellow-500" /> : value >= 4.5 ? <FaStarHalfAlt className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
      </span>
      {text && <span>{text}</span>}
    </div>
  )
}

export default Rating
