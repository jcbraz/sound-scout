import { useState, useEffect, useRef } from "react";

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState<string>("");
  const i = useRef(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (i.current <= text.length - 1) {
        setDisplayText((prevText) => prevText + text.charAt(i.current));
        i.current++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
