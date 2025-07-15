import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';

// import { sendOtp } from "../../Services/AuthServices";



import {
  Mail,
  Lock,
  User,
  Eye,
  Phone,
  EyeOff,
  UserPlus,
  Building2,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";



const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    role: "company",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const { register,user } = useContext(AuthContext);


  const navigate=useNavigate()



const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    const msg = "Passwords do not match";
    setError(msg);
    toast.error(msg);
    return;
  }

  if (formData.password.length < 6) {
    const msg = "Password must be at least 6 characters long";
    setError(msg);
    toast.error(msg);
    return;
  }

  try {
    // 🔐 Register the user
    const res = await register(formData);
    console.log("Registration Response:", res);

    

    // 📲 Send OTP
    const resp = await sendOtp({ number: formData.number });
    console.log("OTP Response:", resp);

    setShowOtpModal(true);

  } catch (err) {
    console.error("Registration Error:", err);
    setError(err.message || "Something went wrong");
    toast.error(err.message || "Something went wrong");
  }
};


const sendOtp = async (phone) => {
       console.log("otp number::",phone)
        let data = JSON.stringify(phone);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/otpsend',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                return response
                
            })
            .catch((error) => {
                console.log(error);
            });

    }

const verifyOtp = async(number,otp)=>{

let data = JSON.stringify({number,otp});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/verifyotp',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  if(response.status==200){
    navigate(formData.role === "company" ? "/company" : "/investor");
  }
  else{
    alert("incorrect otp")
  }
  
})
.catch((error) => {
  console.log(error);
});

     
}




  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 ${showOtpModal ? 'blur-sm pointer-events-none' : ''}`}>

        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join InvestorHub and start your journey
              </p>
            </div>

         {/*    {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )} */}

            <form onSubmit={handleSubmit} className="space-y-6">
          <div >
  <label className="block text-sm font-medium text-gray-700 mb-2">
    I am a...
  </label>
  <div className="grid grid-cols-2 gap-3">
    <label
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        formData.role === "company"
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="role"
        value="company"
        checked={formData.role === "company"}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
        className="hidden"
        required
      />
      <Building2 className="h-6 w-6 mx-auto mb-2" />
      <div className="text-sm font-medium text-center">Company</div>
    </label>

    <label
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        formData.role === "investor"
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="role"
        value="investor"
        checked={formData.role === "investor"}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
        className="hidden"
        required
      />
      <TrendingUp className="h-6 w-6 mx-auto mb-2" />
      <div className="text-sm font-medium text-center">Investor</div>
    </label>
  </div>
</div>


              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="number"
                    name="number"
                    type="tel"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-32 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your number"
                    required
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
                  >
                    Send OTP
                  </button>
                </div>
              </div>


              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <h1 to="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </h1>{" "}
                  and{" "}
                  <h1
                    to="/privacy"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </h1>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <h1
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign in
                </h1>
              </p>
            </div>
          </div>

        </div>
        
      </div>
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the OTP sent to <strong>{formData.number}</strong>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {verifyOtp(formData.number,otp)}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

    
<ToastContainer position="top-center" autoClose={3000} />

    </>
  );
};

export default Register;
