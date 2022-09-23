import React from 'react'
import Link from 'next/link'

const EmptyCart = () => {
  return (
    <div className="empty_cart">
      <div className="empty_cart_foto">
        <img src="img/face.jpg" alt="" />
      </div>
      <div className="empty_cart_text">
        <div className="empty_cart_text">Empty cart</div>
        <div className="empty_cart_link">
          <Link href={"/"} passHref>
            Back home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart