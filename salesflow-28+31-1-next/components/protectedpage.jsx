"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT مخزن في localStorage
    if (!token) {
      router.push("/login"); // إذا ما فيه توكن، ارجع login
    }
  }, [router]);

  return <>{children}</>; // إذا موجود توكن، عرض المحتوى
}
