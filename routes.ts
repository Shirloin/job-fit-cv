export const authRoutes = ["/auth/login", "/auth/register"];

export const publicRoutes = [""];

export const apiAuthPrefix = "/api/auth";

export const protectedRoutes = ["/company/list", "/account"];

export const adminRoutes = ["/company/new", "/account/new", "/student/list"];

export const studentRoutes = ["/cv/new",];

export const roleRoutes = {
  "/": ["student", "admin"],
  "/admin": ["admin"],
};
