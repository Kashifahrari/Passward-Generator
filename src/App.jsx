import { useCallback, useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
function App() {
  const [len, setLen] = useState(8);
  const [numal, setNumal] = useState("false");
  const [spchar, setSpchar] = useState("false");
  const [pass, setPass] = useState("");
  const passRef = useRef(null);
  const passgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numal) {
      str += "0987654321";
    }
    if (spchar) {
      str += "><?:}{!@#$%%^&*()_+=";
    }
    let pasgen = "";
    for (let i = 1; i <= len; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pasgen += str.charAt(index);
    }
    setPass(pasgen);
  }, [len, numal, spchar, setPass]);
  const copytoClip = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(pass);
  }, [pass]);
  useEffect(() => {
    passgen();
  }, [len, numal, spchar]);

  return (
    <>
      <div className="  flex justify-center align-middle w-5/6 max-w-screen-md shadow-md bg-slate-600 rounded-xl px-8 text-gray-400 p-1">
        <h1>Passward Generator</h1>
        <div className="flex relative  mx-2 shadow-sm rounded overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3 "
            placeholder="PASSWARD"
            readOnly
            ref={passRef}
          />

          <button
            onClick={copytoClip}
            className=" mx-2 outline-none rounded-md text-white bg-red-400 p-1"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-1">
          <div className="flex items-center gap-x-1">
            <label>Length: {len}</label>
            <input
              type="range"
              value={len}
              min={6}
              max={100}
              className=" cursor-pointer"
              onChange={(e) => {
                setLen(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <label>NUMNER</label>
            <input
              type="checkbox"
              defaultChecked={numal}
              id="numberInput"
              onChange={() => {
                setNumal((prev) => {
                  !prev;
                });
              }}
            />
          </div>

          <div className="flex items-center gap-x-1">
            <label>Special Char</label>
            <input
              type="checkbox"
              defaultChecked={spchar}
              id="numberInput"
              onChange={() => {
                setSpchar((prev) => {
                  !prev;
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
