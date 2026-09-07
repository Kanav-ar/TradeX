import homeHero from "../../../assets/HomeHero.png";
import darkModeHero from "../../../assets/HomeHero-dm.png";
import useTheme from "../../../context/Theme/themeContext";
import SignUpBtn from "../../signupAndLogin/SignupBtn";
import LoginBtn from "../../signupAndLogin/LoginBtn";
import { useAuth } from "../../../context/Auth/AuthContext";

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
            <div className="text-4xl font-semibold text-center pb-5">
              <span>Good {period}</span>{" "}
              {currentUser.fullname
                ?.split(" ")
                .map((n) => n[0].toUpperCase() + n.slice(1))
                .join(" ")}
            </div>
          )}
          <div className="relative max-w-3xl">
            <img
              src={homeHero}
              alt="Home hero"
              className={`absolute inset-0 w-full rounded-2xl transition-opacity duration-1000 ${
                theme === "light" ? "opacity-100" : "opacity-0"
              }`}
            />

            <img
              src={darkModeHero}
              alt="Home hero"
              className={`w-full rounded-2xl transition-opacity duration-1000 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center px-4 pt-8">
          <h1 className="font-semibold text-3xl">Invest in everything</h1>
          <p className="text-xl text-center">
            Online platform to invest in stocks, derivatives, mutual funds,
            ETFs, bonds, and more.
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
