import { getTotalUsers } from "@/services/userServices";
import ClientHome from "./ClientHome";

async function fetchUserCount() {
  try {
    const userCount = await getTotalUsers();
    return { userCount, error: null };
  } catch (error) {
    return {
      userCount: 0,
      error: error instanceof Error ? error.message : 'Errore nel caricamento dati'
    };
  }
}

export default async function Home() {
  const { userCount, error } = await fetchUserCount();

  return <ClientHome userCount={userCount} error={error} />;
}
