'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  user: any;
  setUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // تحقق من المستخدم عن طريق fetch للـ /api/auth/me
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET" });
        if(res.ok){
          const data = await res.json();
          setUser(data.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
