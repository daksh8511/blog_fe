import {Lock, X} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface LoginModelType{
    setShowLoginModal : (value : boolean) => void;
}

const LoginModel = ({setShowLoginModal} : LoginModelType) => {
    const navigate = useNavigate()
  return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center scale-up-center">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <Lock size={30} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-500 mb-6">Please sign in to interact with this post, leave comments, and save it for later.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate("/login")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Sign In</button>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 text-sm hover:underline">Cancel</button>
            </div>
          </div>
        </div>
  )
}

export default LoginModel