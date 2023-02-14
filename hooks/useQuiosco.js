import QuioscoContext from "@/context/QuioscoProvider";
import { useContext } from "react";

export default function useQuiosco() {
  return useContext(QuioscoContext)
}