import Menu from "./Menu";

const TopBar = () => {
  return (
    <header className="flex h-16 lg:px-8 md:h-[10vh] w-full items-center bg-white shadow-[0_0_4px_2px_rgb(236,235,235)] border-gray-200 transition-colors dark:bg-[#070d17] dark:shadow-none border-b dark:border-gray-700">
      <Menu />
    </header>
  );
};

export default TopBar;
