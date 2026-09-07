import homeHero from "../../../assets/HomeHero.png";
import darkModeHero from "../../../assets/HomeHero-dm.png";
import useTheme from "../../../context/Theme/themeContext";
import BlueBtn from "../../common/BlueBtn";
import SignUpBtn from "../../signupAndLogin/SignupBtn";
import LoginBtn from "../../signupAndLogin/LoginBtn";

export default function Hero() {
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-7xl">
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
          {/* <BlueBtn tag="Sign up for free" /> */}
          <div className="flex  gap-8">
            <SignUpBtn/>
          <LoginBtn/>
          </div>
        </div>
      </div>
    </>
  );
}
