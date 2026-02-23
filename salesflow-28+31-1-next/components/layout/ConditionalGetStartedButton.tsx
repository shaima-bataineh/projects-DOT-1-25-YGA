// /components/layout/ConditionalGetStartedButton.tsx
'use client';
import { useAuth } from "@/app/context/AuthContext";

export default function ConditionalGetStartedButton() {
  const { user } = useAuth();

  if (user) return null; // إذا مسجل دخول لا يظهر
  return <a href="/get-started" className="btn btn-primary">Get Started</a>;
}
