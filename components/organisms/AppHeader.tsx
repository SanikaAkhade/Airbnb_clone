import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import AppLogo, { EAppLogo } from '@/components/atoms/AppLogo';
import AppSearchBar from '@/components/molecules/AppSearchBar';
import AppHeaderOption from '@/components/atoms/AppHeaderOption';
import AppSearchBarMobile from '@/components/molecules/AppSearchBarMobile';
import { GlobeAltIcon, MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import { EHeaderOpions, IExploreNearby } from 'typings';
import { formatGuests, formatRangeDate } from 'utils';

interface AppHeaderProps {
  exploreNearby?: IExploreNearby[];
  searchPage?: boolean;
  query?: any;
}

const AppHeader: FC<AppHeaderProps> = ({ exploreNearby, searchPage, query }) => {
  const [isSnapTop, setIsSnapTop] = useState<boolean>(searchPage ? false : true);
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(
    searchPage ? false : true
  );
  const [activeMenu, setActiveMenu] = useState<EHeaderOpions | null>(
    EHeaderOpions.PLACES_TO_STAY
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); 

  const handleOnScroll = () => {
    const position = window.scrollY;
    if (position >= 50) {
      setIsSnapTop(false);
      setIsActiveSearch(false);
    } else {
      setIsSnapTop(true);
      setIsActiveSearch(true);
    }
  };

  const headerBehavior = () => {
    let style = [];
    if (!isSnapTop) style.push('bg-white shadow-lg');
    if (!isActiveSearch) style.push('h-[86px] pb-5');
    if (isActiveSearch) style.push('pb-8');
    return style.join(' ');
  };

  useEffect(() => {
    if (!searchPage) {
      window.addEventListener('scroll', handleOnScroll);
    }
    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [searchPage]);

  return (
    <>
      <header
        className={`${headerBehavior()} z-50 fixed top-0 w-full pt-5 duration-300 md:transition-none`}
      >
        <div
          className={`${
            searchPage ? 'px-7' : 'container'
          } hidden md:grid md:grid-cols-[auto,1fr,auto] xl:grid-cols-[1.5fr,3fr,1.5fr] 2xl:grid-cols-[1fr,3fr,1fr] items-start`}
        >
          <div className="flex items-center h-12">
            <Link href="/">
              <a>
                <AppLogo
                  className={`${isSnapTop ? 'text-white' : 'text-primary'} hidden xl:block`}
                  type={EAppLogo.TEXT}
                />
                <AppLogo
                  className={`${isSnapTop ? 'text-white' : 'text-primary'} block xl:hidden`}
                  type={EAppLogo.LOGO}
                />
              </a>
            </Link>
          </div>

          <div className="relative flex flex-col items-center justify-center order-last col-span-2 xl:order-none xl:col-span-1">
            <div className="text-white">
              <AppHeaderOption
                isSnap={isSnapTop}
                isActiveHeader={isActiveSearch}
                active={activeMenu === EHeaderOpions.PLACES_TO_STAY}
                onClick={() => setActiveMenu(EHeaderOpions.PLACES_TO_STAY)}
              >
                Places to stay
              </AppHeaderOption>
              <AppHeaderOption
                isSnap={isSnapTop}
                isActiveHeader={isActiveSearch}
                active={activeMenu === EHeaderOpions.FIND_EXPERIENCES}
                onClick={() => setActiveMenu(EHeaderOpions.FIND_EXPERIENCES)}
              >
                Experiences
              </AppHeaderOption>
              <AppHeaderOption isSnap={isSnapTop} isActiveHeader={isActiveSearch}>
                <Link href="/">
                  <a>Online Experiences</a>
                </Link>
              </AppHeaderOption>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 relative">
            
            <Link href="/">
              <a
                className={`${
                  isSnapTop ? 'text-white' : 'text-gray-500'
                } flex items-center h-10 px-4 rounded-full font-medium tracking-wide text-sm`}
              >
                Become a host
              </a>
            </Link>

            <Link href="/">
              <a
                className={`${
                  isSnapTop ? 'text-white' : 'text-gray-500'
                } flex items-center h-10 px-3 mr-1 rounded-full`}
              >
                <GlobeAltIcon className="h-5" />
              </a>
            </Link>

            
            <div className="relative">
              <button
                className="flex items-center pl-3 pr-1 bg-white border border-gray-200 rounded-full h-11 hover:shadow-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-5 mr-2 text-gray-300" />
                <UserCircleIcon className="h-10 text-gray-300" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <Link href="/signin">
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Sign In
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Sign Up
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <AppSearchBar
          menu={activeMenu}
          isActiveHeader={isActiveSearch}
          searchPage={searchPage}
          closeSearch={() => setIsActiveSearch(false)}
        />
        
        <AppSearchBarMobile exploreNearby={exploreNearby || []} searchPage={searchPage} />
      </header>

      {isActiveSearch && !isSnapTop && (
        <div
          className="fixed inset-0 z-40 bg-transparent-black"
          onClick={() => setIsActiveSearch(false)}
        />
      )}
    </>
  );
};

export default AppHeader;

