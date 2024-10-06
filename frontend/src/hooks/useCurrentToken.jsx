import { useContext } from "react";
import { CurrentTokenContext } from "../contexts/CurrentTokenContext";

const useCurrentToken = () => {
  return useContext(CurrentTokenContext);
};

export default useCurrentToken;
