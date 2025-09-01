import { Button } from "./ui/button";

const Header = () => (
  <div className="flex justify-between items-center sm:justify-end">
    <h1 className="sm:hidden">Logo</h1>
    <Button className="h-9 w-9 sm:h-14 sm:w-14  bg-background-secondary text-xs border-1 border-[#FFFFFF0F]">
      UA
    </Button>
  </div>
);

export default Header;
