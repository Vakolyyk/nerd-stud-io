"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return <p>Сторінка не знайдена, вас буде перенаправлено...</p>;
};

export default Home;
