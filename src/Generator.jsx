import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Generator() {
  const [password, setPasssword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [length, setLength] = useState(8);
  const [includeNums, setIncludeNums] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);

  const styles =
    "w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-md dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-none";

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = "@#_$";

    if (includeNums) str += nums;
    if (includeChars) str += chars;

    if (includeNums)
      pass += nums.charAt(Math.floor(Math.random() * nums.length));
    if (includeChars)
      pass += chars.charAt(Math.floor(Math.random() * chars.length));

    for (let i = pass.length; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    pass = pass
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPasssword(pass);
  }, [length, includeNums, includeChars, setPasssword]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNums, includeChars, generatePassword]);

  const passwordRef = useRef(null);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [password, setIsCopied]);

  return (
    <div className="w-fit h-fit flex flex-wrap flex-col items-center justify-center gap-5 bg-gray-700 px-10 py-5 rounded-md mx-10">
      <div className="flex w-full items-center justify-center">
        <input
          type="text"
          value={password}
          className="w-full h-[47px] bg-neutral-900 px-3 py-3 rounded-tl-md rounded-bl-md font-medium outline-0 text-neutral-50"
          ref={passwordRef}
          readOnly
        />
        <button
          className={`cursor-pointer w-30 h-[47px] px-3 py-3 font-medium text-white ${
            isCopied ? "bg-blue-400" : "bg-blue-500"
          } rounded-tr-md rounded-br-md`}
          onClick={copyPassword}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-5 w-full h-fit md:flex-row">
        <div className="flex items-center gap-1">
          <input
            type="range"
            name="length"
            id="length"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length" className="text-neutral-50">
            Length ({length})
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            defaultChecked={includeNums}
            onChange={() => setIncludeNums((prev) => !prev)}
            className={styles}
          />
          <label htmlFor="numbers" className="text-neutral-50">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            name="characters"
            id="characters"
            defaultChecked={includeChars}
            onChange={() => setIncludeChars((prev) => !prev)}
            className={styles}
          />
          <label htmlFor="characters" className="text-neutral-50">
            Characters
          </label>
        </div>
      </div>
      <button
        className="bg-blue-600 m-auto p-3 rounded-md text-neutral-50 cursor-pointer transform transition-transform hover:translate-y-0.5"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}
