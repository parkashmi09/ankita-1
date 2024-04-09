'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SidebarMenu from './moleculs/SidebarMenu';
import { HouseSimpleIcon, ReceiptIcon, UsersIcon } from '../assets/icons';
import { Flag } from '@mui/icons-material';
import { Transition } from '@headlessui/react';

const SidebarExpand = ({ children, show }) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="w-full"
    >
      <section className="relative flex w-full items-start gap-4">
        <div className="absolute left-6 h-full w-px bg-netral-30" />
        <div className="flex w-full flex-col items-start justify-end gap-2 pl-9">
          {children}
        </div>
      </section>
    </Transition>
  );
};

export const Sidebar=() =>{
  const [showSidebar, setShowSidebar] = useState(true);
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showCountryAdmin, setShowCountryAdmin] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("role");
    if (value !== null) {
      setRole(value);
    }
  }, []);

  return (
    showSidebar && (

            <aside
            id="sidebar"
            className="min-h-screen z-10 overflow-y-auto overflow-x-hidden bg-black px-6 py-4 pt-8 shadow-sm 2xl:w-72 2xl:pt-10 transition-all duration-300"
            >
              <div className="mb-8 flex items-center gap-3 2xl:mb-10">
                <div onClick={() => setShowSidebar(!showSidebar)}>
                  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                    <path
                      className="text-white"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                      d="M4 7h22M4 15h22M4 23h22"
                    ></path>
                  </svg>
                </div>
                <Link href="/" className="flex items-center gap-3 2xl:mb-10">
                  <Image
                    src="/useFun.png"
                    alt="usefun"
                    width={600}
                    height={600}
                    className="h-7 w-7 2xl:h-8 2xl:w-8"
                  />
                  <h5 className="text-body-xl font-semibold text-white uppercase">
                    DASHBOARD
                  </h5>
                </Link>
              </div>
      
              <nav className="mt-10 flex w-full flex-col items-start gap-3">
                <SidebarMenu
                  icon={<HouseSimpleIcon />}
                  name="HOME"
                  variant="default"
                  href="/"
                  exact
                />
                {/* Users */}
                {role !== "Manager" && (
                  <SidebarMenu
                    active={showUsersMenu}
                    onClick={() => setShowUsersMenu(!showUsersMenu)}
                    icon={<UsersIcon />}
                    name="Users"
                    variant="sub-menu"
                  />
                )}
      
                <SidebarExpand show={showUsersMenu}>
                  <SidebarMenu
                    name="Add Official  Users"
                    variant="expand"
                    href="/users/add-official-users"
                  />
      
                  <SidebarMenu
                    name="View  Users"
                    variant="expand"
                    href="/users/view-users"
                  />
      
                  <SidebarMenu
                    name="Top  Users"
                    variant="expand"
                    href="/users/top-users"
                  />
      
                  <SidebarMenu
                    name="Push Notification"
                    variant="expand"
                    href="/users/push-notifications"
                  />
                </SidebarExpand>
                {role !== "Manager" && (
                  <SidebarMenu
                    active={showManager}
                    onClick={() => setShowManager(!showManager)}
                    icon={<ReceiptIcon />}
                    name="Manager"
                    variant="sub-menu"
                  />
                )}
      
                <SidebarExpand show={showManager}>
                  <SidebarMenu
                    name="View Manager"
                    variant="expand"
                    href="/manager/view-manager"
                  />
                </SidebarExpand>
      
                <SidebarMenu
                  active={showCountryAdmin}
                  onClick={() => setShowCountryAdmin(!showCountryAdmin)}
                  icon={<Flag />}
                  name="Country Admin"
                  variant="sub-menu"
                />
      
                <SidebarExpand show={showCountryAdmin}>
                  <SidebarMenu
                    name="View Country Admin"
                    variant="expand"
                    href="/country-admin/view-country-admin"
                  />
                </SidebarExpand>
              </nav>
            </aside>
          )
  );
}

export default Sidebar;
