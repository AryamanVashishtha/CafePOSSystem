import React from 'react'
import { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'  // Assuming you are using react-toastify for notifications

function Allproducts() {
  const context = useContext(myContext)
  const { mode, product } = context  // Removed unused context properties

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)

  // Function to add product to cart and show success message
  const addCart = (product) => {
    dispatch(addToCart(product))
    toast.success('Added to cart')
  }

  // Effect to store cart items in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Our Menu
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          {/* Products List */}
          <div className="flex flex-wrap -m-4">
            {product.map((item, index) => {
              const { title, price, inStock, imageUrl} = item

              return (
                <div key={index} className="p-4 md:w-1/4 w-full drop-shadow-lg">
                  <div className={`h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                    <div className="flex justify-center w-full">
                      <img
                        className="rounded-2xl object-cover h-80 w-full p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                        src={imageUrl}
                        alt="product"
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === "dark" ? "white" : "" }}>
                        JIIT Cafeteria
                      </h2>
                      <h1 className="title-font text-lg font-medium mb-3" style={{ color: mode === "dark" ? "white" : "" }}>
                        {title} &nbsp;
                        <span
                          className={inStock === '1' ? '' : "border-4 border-red-500 font-bold "}
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {inStock === '1' ? '' : 'Out of Stock'}
                        </span>
                      </h1>
                      <p className="leading-relaxed mb-3" style={{ color: mode === "dark" ? "white" : "" }}>
                        ₹{price}
                      </p>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (inStock === '1') {
                              addCart(item)
                            } else {
                              toast.error('Product is out of stock')
                            }
                          }}
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                        >
                          {inStock === '1' ? 'Add To Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section >
    </Layout>
  )
}

export default Allproducts
