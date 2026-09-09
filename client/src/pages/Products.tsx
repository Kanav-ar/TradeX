import Section from "../components/layout/section/Section";
import HeroProducts from "../components/products/hero/Hero";
import LeftImgCard from "../components/products/cards/LeftImgCard";
import Partners from "../components/products/partners/Partners";
import RightImgCard from "../components/products/cards/RightImgCard";
import KiteImg from "../assets/kite.png";
import KiteImgDm from "../assets/kite-dm.png";
import CoinImg from "../assets/coin.png";
import VarsityImg from "../assets/varsity.png";
import ConsoleImg from "../assets/console.png";
import KiteApiImg from "../assets/kiteconnect.png";
import useTheme from "../context/Theme/themeContext";

export default function Products() {
  const {theme} = useTheme();
  return (
    <>
      <Section>
        <HeroProducts />
      </Section>
      <Section className="py-4">
        <hr className="text-gray-200" />
      </Section>
      <Section>
        <LeftImgCard
          heading="Kite"
          text="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
          img={theme === "light"? KiteImg:KiteImgDm}
          btn={[
            { text: "Try demo", link: "" },
            { text: "Learn more", link: "" },
          ]}
          storeLinks={{
            playStore:
              "https://play.google.com/store/apps/details?id=com.zerodha.kite3",
            appStore:
              "https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802",
          }}
        />
      </Section>
      <Section>
        <RightImgCard
          heading="Console"
          img={ConsoleImg}
          text="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
          btn={[{ text: "Learn more", link: "" }]}
        />
      </Section>
      <Section>
        <LeftImgCard
          heading="Coin"
          text="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
          img={CoinImg}
          btn={[{ text: "Coin", link: "" }]}
          storeLinks={{
            playStore:
              "https://play.google.com/store/apps/details?id=com.zerodha.coin",
            appStore:
              "https://apps.apple.com/in/app/coin-by-zerodha-mutual-funds/id1392892554",
          }}
        />
      </Section>
      <Section>
        <RightImgCard
          heading="Kite Connect API"
          text="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
          img={KiteApiImg}
          btn={[{text:"Kite Connect",link:""} ]}
        />
      </Section>
      <Section>
        <LeftImgCard
          heading="Varsity mobile"
          text="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
          img={VarsityImg}
          btn={[]}
          storeLinks={{
            playStore:
              "https://play.google.com/store/apps/details?id=com.zerodha.coin",
            appStore:
              "https://apps.apple.com/in/app/zerodha-varsity/id1474610753",
          }}
        />
      </Section>
      <Section>
        <Partners />
      </Section>
    </>
  );
}
