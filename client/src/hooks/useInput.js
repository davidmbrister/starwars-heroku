import { useState } from "react";
// We can package the details necessary to create controlled form components into a custom hook. 
// TODO: make this work with a search bar
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
}