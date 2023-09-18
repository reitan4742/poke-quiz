import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="text-darkblue bg-logo absolute top-0 w-full flex items-center h-12">
      <a href="/"><img src={logo} width="300px" /></a>
    </header>
  );
}

export default Header;