import { set } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

export const alertState = atom({
  key: "alertState",
  default: "",
});

export const useAlert = () => {
  const [alert, setAlert] = useRecoilState(alertState);

  const hideAlert = () => {
    setAlert(null);
  };

  return { alert, hideAlert, setAlert };
};
