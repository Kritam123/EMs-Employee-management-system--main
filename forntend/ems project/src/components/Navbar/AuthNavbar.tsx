import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const AuthNavbar = () => {
  return (
    <nav className="bg-secondary  fixed top-0 left-0 right-0 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">EMS</Link>
               
                <div className="flex gap-3">
                <Link to={"/auth/sign-in"}>
                                    <Button>
                                        Login as Employee
                                    </Button>

                                </Link>


                </div>
                <Button className="md:hidden text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
            </div>
        </nav>
  )
}

export default AuthNavbar