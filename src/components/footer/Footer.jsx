import { useContext } from 'react'
import myContext from '../../context/data/myContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(`/login`);
  }
  return (
    <div>
      <footer className="text-gray-600 body-font bg-gray-300" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
        <div className="container px-5 py-10 mx-auto" >
          <div className="flex flex-wrap md:text-left text-center order-first justify-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
            </div>
          </div>

        </div>

        <div className="bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(55 57 61)' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className=" justify-evenly container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
            <Link to={'/'} className='flex'>
              <div className="flex ">
                <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>JIIT Cafeteria</h1>
              </div>
            </Link>
            <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4" style={{ color: mode === 'dark' ? 'white' : '' }}>© 2024 JIIT Cafeteria
              <a href="https://twitter.com/" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank" style={{ color: mode === 'dark' ? 'white' : '' }}>www.jiitcafeteria.com</a>
            </p>
            <button onClick={()=>handleClick()} className='text-blue-700'>Click to login (Admins only)</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer