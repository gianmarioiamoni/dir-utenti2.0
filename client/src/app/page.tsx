import ClientHome from "./ClientHome";
import {useCount} from "@/hooks/useCount";

const {fetchUserCount} = useCount();

export default async function Home() {
  const { userCount, error } = await fetchUserCount();

  return <ClientHome userCount={userCount} error={error} />;
}
