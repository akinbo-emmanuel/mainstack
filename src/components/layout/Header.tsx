import { BiMenu } from "react-icons/bi";
import Logo from "../../assets/logo.webp";
import { GoHome } from "react-icons/go";
import {
  MdOutlineGroup,
  MdOutlineInsertChartOutlined,
  MdOutlineMessage,
  MdOutlineNotifications,
  MdOutlineWidgets,
  MdPayments,
} from "react-icons/md";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 p-4 w-full">
      <div className="w-full max-w-7xl mx-auto shadow-[0px_2px_4px_0px_#2D3B430D,0px_2px_6px_0px_#2D3B430F] border-2 border-white rounded-full p-3 pl-6 flex items-center justify-between bg-white">
        <img src={Logo} alt="Logo" className="size-9" />

        <Links />

        <div className="flex items-center gap-2">
          <button className="rounded-full p-2.5 text-[#56616B]">
            <MdOutlineNotifications size={20} />
          </button>
          <button className="rounded-full p-2.5 text-[#56616B]">
            <MdOutlineMessage size={20} />
          </button>
          <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-[#EFF1F6]">
            <div className="bg-linear-to-br from-[#5C6670] to-[#131316] size-8 text-center flex items-center justify-center rounded-full">
              <p className="text-white text-sm/4 font-semibold">OJ</p>
            </div>

            <BiMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

const Links = () => {
  const path = window.location.pathname;
  const links = [
    {
      name: "Home",
      href: "/home",
      icon: <GoHome size={20} />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <MdOutlineInsertChartOutlined size={20} />,
    },
    {
      name: "Revenue",
      href: "/",
      icon: <MdPayments size={20} className="scale-y-[-1] rotate-180" />,
    },
    {
      name: "CRM",
      href: "/crm",
      icon: <MdOutlineGroup size={20} />,
    },
    {
      name: "Apps",
      href: "/apps",
      icon: <MdOutlineWidgets size={20} />,
    },
  ];

  return (
    <div className="font-degular flex items-center gap-5">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={`
            ${
              path === link.href
                ? "text-white bg-[#131316] rounded-full"
                : "text-[#56616B]"
            }
          leading-6 py-2 pl-3.5 pr-4 cursor-pointer font-semibold flex items-center gap-1 transition-all duration-300 ease-in-out`}
        >
          {link.icon}
          {link.name}
        </a>
      ))}
    </div>
  );
};
