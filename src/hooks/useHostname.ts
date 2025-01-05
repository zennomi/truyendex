import { useState, useEffect } from "react";

const useHostname = (initialHost = "") => {
  const [hostname, setHostname] = useState(initialHost);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
  }, []);

  return hostname;
};

export default useHostname;
