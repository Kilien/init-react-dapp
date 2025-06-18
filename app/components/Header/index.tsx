import { useMediaQuery } from '~/hooks/useMediaQuery';
import { RxTextAlignJustify } from 'react-icons/rx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import Menu from './Menu';

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showMenu, setShowMenu] = useState(false);
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const tableList = [
    {
      name: 'Home',
      href: '/',
      id: '/',
      icon: '',
      offset: 0,
    },
    {
      name: 'Roadmap',
      href: '/',
      id: 'roadmap',
      icon: '',
      offset: 4000,
    },
    {
      name: 'Docs',
      href: '/',
      id: 'doc',
      icon: '',
      offset: 5800,
    },
  ];

  const handleClickMenu = (item: {
    name: string;
    href: string;
    id: string;
    offset?: number;
  }) => {
    if (item.href !== '/') {
      window.location.href = item.href;
    } else if (item.id !== '/') {
      const element = document.getElementById(item.id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;

        window.scrollTo({
          top: item.offset,
          behavior: 'smooth',
        });
      }
    }
    setShowMenu(false); // 关闭菜单
  };

  const handleDesktopClickMenu = (item: {
    name: string;
    href: string;
    id: string;
  }) => {
    if (item.href) {
      if (item.id !== '/') {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      navigate(item.href);
    }
  };

  return (
    <div className="drawer">
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={showMenu}
        onChange={e => setShowMenu(e.target.checked)}
      />

      <div className="drawer-content">
        {/* Header Content */}
        <div className="absolute top-0 right-0 left-0 z-10 flex h-[80px] w-full items-center justify-between px-[16px] backdrop-blur-[10px] md:bg-[#00000080] lg:px-[48px] 2xl:px-[169px]">
          <img
            src="/logo.png"
            alt="logo"
            className="mr-8 h-14 object-contain md:h-14 xl:mr-14"
          />

          {!isMobile && (
            <div className="flex flex-1 items-center justify-start gap-8 xl:gap-10">
              {tableList.map(item => (
                <div
                  onClick={() => handleDesktopClickMenu(item)}
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
            </div>
          )}

          {isMobile ? (
            <label
              htmlFor="mobile-drawer"
              className="drawer-button cursor-pointer"
            >
              <RxTextAlignJustify
                color="#fff"
                size={24}
                className="h-[24px] w-[24px]"
              />
            </label>
          ) : (
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            className="flex h-[72px] w-[180px] items-center justify-center"
                            style={{
                              backgroundImage: 'url(/imgs/common/play-btn.png)',
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                            type="button"
                            onClick={openConnectModal}
                          >
                            <span className="text-center text-xl font-normal text-white drop-shadow-[0_0_6px_#7DFF65]">
                              Connect Wallet
                            </span>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            className="flex h-[72px] w-[180px] items-center justify-center"
                            style={{
                              backgroundImage: 'url(/imgs/common/play-btn.png)',
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                            type="button"
                            onClick={openChainModal}
                          >
                            <span className="text-center text-xl font-normal text-white drop-shadow-[0_0_6px_#7DFF65]">
                              ErrorNet
                            </span>
                          </button>
                        );
                      }

                      return (
                        <button
                          className="flex h-[72px] w-[180px] items-center justify-center"
                          style={{
                            backgroundImage: 'url(/imgs/common/play-btn.png)',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                          type="button"
                          onClick={openAccountModal}
                        >
                          <span className="text-center text-xl font-normal text-white drop-shadow-[0_0_6px_#7DFF65]">
                            {account.displayName}
                          </span>
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          )}
        </div>
      </div>

      {/* 使用 Menu 组件 */}
      <Menu tableList={tableList} onMenuClick={handleClickMenu} />
    </div>
  );
};

export default Header;
