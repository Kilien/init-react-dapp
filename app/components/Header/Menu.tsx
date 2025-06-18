import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MdClose } from 'react-icons/md';

interface MenuItem {
  name: string;
  href: string;
  id: string;
  icon: string;
  offset: number;
}

interface MenuProps {
  tableList: MenuItem[];
  onMenuClick: (item: MenuItem) => void;
}

const Menu = ({ tableList, onMenuClick }: MenuProps) => {
  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

      {/* Menu Content */}
      <aside className="min-h-screen w-screen bg-black pt-20 text-white">
        {/* Logo */}
        <img src="/logo.png" alt="logo" className="mx-auto mb-[46px] h-20" />

        {/* 菜单项 */}
        <nav className="flex w-full flex-col items-center gap-4">
          {tableList.map(item => (
            <div
              onClick={() => onMenuClick(item)}
              key={item.name}
              className="flex cursor-pointer items-center justify-center gap-2"
            >
              {item?.icon && (
                <img
                  src={`/imgs/common/${item.icon}`}
                  alt={item.name}
                  className="mb-1 h-[18px]"
                />
              )}
              <span className="text-2xl text-white">{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Connect Wallet 按钮 */}

        {/* 关闭按钮 */}
        <label
          htmlFor="mobile-drawer"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <MdClose className="text-2xl text-white" />
        </label>
      </aside>
    </div>
  );
};

export default Menu;
