import {
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    Building,
    NotebookText
  } from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  export function getUserMenuList(pathname: string): Group[] {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/",
            label: "Dashboard",
            active: pathname.includes("/"),
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "/cv/new",
            label: "Create New CV",
            active: pathname.includes("/cv/new"),
            icon: SquarePen,
            submenus: []
          },
          {
            href: "/company/list",
            label: "Company List",
            active: pathname.includes("/company/list"),
            icon: Building,
            submenus: []
          },
        ]
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: []
          }
        ]
      }
    ];
  }
  