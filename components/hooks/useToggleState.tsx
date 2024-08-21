import { useState } from "react"

export default function useToggleState(defaultValue: boolean) {
  const [bool, setBool] = useState(defaultValue)

  const toggleBool = () => {
    setBool(!bool);
  }

  return [bool, toggleBool] as const;
}