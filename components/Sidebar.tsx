import { FaHome, FaSearch, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-1/6 h-screen bg-white shadow-md p-5 flex flex-col fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">ETHera</h2>

      <nav className="space-y-4">
        <SidebarItem icon={<FaHome />} text="Feed" badge={37} />
        <SidebarItem icon={<FaSearch />} text="Explore" />
        <SidebarItem icon={<FaEnvelope />} text="Messages" />
        <SidebarItem icon={<FaMoneyBillWave />} text="Payment" />
      </nav>

      <div className="mt-auto">
        <h3 className="font-semibold mb-2">Subscriptions</h3>
        <SidebarItem text="Brooklyn Simmons" />
        <SidebarItem text="Alisa Flores" />
        <div className="flex justify-center">
          <button className="mt-4 text-red-500 px-6 py-2 border border-red-500 rounded rounded-md">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  badge,
}: {
  icon?: JSX.Element;
  text: string;
  badge?: number;
}) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md cursor-pointer">
    <div className="flex items-center gap-3">
      {icon && <span className="text-gray-600">{icon}</span>}
      <span>{text}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default Sidebar;
