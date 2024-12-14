'use client';

import ClientHome from "./ClientHome";
import { useCount } from "@/hooks/useCount";
import { useState, useEffect } from 'react';

export default function Home() {
  const { fetchUserCount } = useCount();
  const [data, setData] = useState<{ userCount: number; error: string | null }>({ userCount: 0, error: null });

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchUserCount();
      setData(result);
    };
    loadData();
  }, [fetchUserCount]);

  return <ClientHome userCount={data.userCount} error={data.error} />;
}
