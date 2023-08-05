
import animation_lkqxj0al from '../../components/animations/animation_lkqxj0al.json'
import { Link } from 'react-router-dom'
import animation_lkqhb84m from '../../components/animations/animation_lkqhb84m.json'
import Lottie from 'lottie-react'
import {  AiFillRightCircle } from 'react-icons/ai'
const Home = () => {
    
 
  return (
    <div className='min-h-full md:flex  justify-center items-center m-auto   w-full '>
    <div className='md:w-1/3 ml-24  '>
    <Lottie style={{width:300 }} animationData={animation_lkqxj0al}/>
    </div>
    <div style={{fontFamily:"sans-serif"}} className='md:w-2/3 p-2 m-2'>
  
   <h2 className='text-lg'> Welcome to our Social Media Hub!</h2>

Connecting and sharing have never been easier! Our platform is designed to bring people together from all walks of life to create meaningful connections, express themselves, and discover the world in a whole new way.

Why Choose Us?

Seamless Connectivity: Stay in touch with friends, family, and colleagues effortlessly. Our user-friendly interface ensures smooth communication and makes connecting with your loved ones a breeze.

Explore Your Interests: Dive into a world of diverse interests and passions. Discover communities that resonate with your hobbies, interests, and expertise, and share your knowledge with like-minded individuals.

Unleash Your Creativity: Express yourself freely with our versatile multimedia features. Share your photos, videos, art, and thoughts to create a virtual canvas that reflects your unique personality.

Privacy and Security: Your safety is our utmost priority. Our stringent privacy measures and robust security protocols ensure that your personal information remains protected at all times.

Empowering Communities: We believe in making a positive impact. Connect with NGOs, charities, and social causes to support initiatives that matter to you and contribute to creating a better world.

Stay Informed: Get the latest updates on news, trends, and events from around the world. Stay informed and engage in discussions that matter to you most.

Join us today and become part of a vibrant community where diversity is celebrated, creativity is nurtured, and meaningful connections are made. Together, let's create a virtual space that fosters positivity, inclusivity, and growth.

Sign up now and embark on an exciting journey of self-expression and discovery! The world is waiting to connect with you.
<button className='p-2 m-2 rounded-md transition-all duration-300 ease-in-out bg-orange-300 hover:bg-orange-500 '><Link className='flex ml-2' to={`signin`}>Signin <AiFillRightCircle className='ml-2 mt-1'/> </Link></button>
    </div>
    <Lottie style={{width:100}} animationData={animation_lkqhb84m}/>
   
     </div>
  )
}

export default Home
