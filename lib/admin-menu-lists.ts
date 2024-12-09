import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building,
  UserPen,
  User
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

export function getAdminMenuList(pathname: string): Group[] {
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
          href: "/company/new",
          label: "New Company",
          active: pathname.includes("/company/new"),
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
        {
          href: "/account/new",
          label: "New Account",
          active: pathname.includes("/account/new"),
          icon: UserPen,
          submenus: []
        },
        {
          href: "/student/list",
          label: "Student List",
          active: pathname.includes("/student/list"),
          icon: Users,
          submenus: []
        }
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
