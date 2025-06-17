import { useMediaQuery } from '~/hooks/useMediaQuery';
import { RxTextAlignJustify } from 'react-icons/rx';
import { useState } from 'react';
import Menu from './Menu';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showMenu, setShowMenu] = useState(false);
  const { openConnectModal } = useConnectModal();

  const tableList = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'AI Agent',
      href: '/',
    },
    {
      name: 'Product',
      href: '/',
    },
    {
      name: 'Docs',
      href: '/',
    },
  ];

  return (
    <div className="absolute top-0 right-0 left-0 z-10 mt-6 flex w-full items-center justify-between px-[16px] md:mt-[60px] lg:px-[64px] 2xl:px-[169px]">
      <img
        src="/logo.png"
        alt="logo"
        className="mr-8 h-6 object-contain md:h-10 xl:mr-[96px]"
      />

      {!isMobile && (
        <div className="flex flex-1 items-center justify-start gap-[40px] xl:gap-[80px]">
          {tableList.map(item => (
            <a
              href={item.href}
              key={item.name}
              className="text-base text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {isMobile ? (
        <RxTextAlignJustify
          color="#fff"
          size={24}
          className="h-[24px] w-[24px] cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      ) : (
        <button
          className="h-[60px] w-[240px] cursor-pointer rounded-full text-base text-white"
          style={{
            background: 'linear-gradient(90deg, #5694FF 0%, #2659FF 100%)',
          }}
          onClick={() => openConnectModal?.()}
        >
          Connect Wallet
        </button>
      )}

      {showMenu && <Menu show={showMenu} onClose={() => setShowMenu(false)} />}
    </div>
  );
};

export default Header;
