  
import { Link } from "react-router";


export default function ForgetPasswordBtn() {
  return <Link to={"/forgot-password"} className="text-blue-600 dark:text-blue-500 text-sm cursor-pointer" >Forgot Password?</Link>;
}
