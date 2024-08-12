import { useState } from "react"

export default (defaultValue: boolean) => {
  const [bool, setBool] = useState(defaultValue)

  const toggleBool = () => {
    setBool(!bool);
  }

  return [bool, toggleBool] as const;
}