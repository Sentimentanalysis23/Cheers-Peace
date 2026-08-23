import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Portal | Cheers & Peace",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminLoginClient />;
}
