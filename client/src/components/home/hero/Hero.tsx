import useTheme from "../../../context/Theme/themeContext";
import SignUpBtn from "../../signupAndLogin/SignupBtn";
import LoginBtn from "../../signupAndLogin/LoginBtn";
import { useAuth } from "../../../context/Auth/AuthContext";
import heroHome from "../../../assets/tradeXHomeHero.png"
import heroHomeDark from "../../../assets/tradeXHomeHeroDark.png"


export default function Hero() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  function getTimeOfDay() {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
      return "Morning";
    } else if (hours >= 12 && hours < 17) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }

  const period = getTimeOfDay();

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-7xl">
          {currentUser && (
            <div className="text-4xl font-semibold text-center pb-4 mb-5">
              <span>Good <span className="text-[#387ed1]">{period}</span>, </span>{" "}
              {currentUser.fullname
                ?.split(" ")
                .map((n) => n[0].toUpperCase() + n.slice(1))
                .join(" ")}
            </div>
          )}
          <div className="relative max-w-3xl">
            <img
              src={heroHome}
              alt="Home hero"
              className={`absolute inset-0 w-full rounded-2xl transition-opacity duration-1000 ${
                theme === "light" ? "opacity-100" : "opacity-0"
              }`}
            />

            <img
              src={heroHomeDark}
              alt="Home hero"
              className={`w-full rounded-2xl transition-opacity duration-1000 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center px-4 pt-8">
          <h1 className="font-semibold text-3xl">Your market. Your moves.</h1>
          <p className="text-xl text-center">
            A modern trading workspace to explore markets, place trades, and
            track your portfolio with clarity.
          </p>
          {!currentUser && (
            <div className="flex  gap-8">
              <SignUpBtn />
              <LoginBtn />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
