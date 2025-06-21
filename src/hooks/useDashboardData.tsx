import useFetch from "@/hooks/useFetch";
import { Website } from "@/types/dashboard";

const getEndpointByWebsiteType = (type: Website["type"]) => {
  switch (type) {
    case "analytics":
      return "/db1/get-stats";
    case "scr":
      return "/db2/get-stats";
    case "olympiad":
      return "/db3/get-stats";
    case "computation":
      return "/db4/get-stats";
    default:
      return null;
  }
};

export default function useDashboardData(websiteType: Website["type"]) {
  const endpoint = getEndpointByWebsiteType(websiteType);
  const { data, loading, error } = useFetch<any>(endpoint || "");

  return { data, loading, error };
}
