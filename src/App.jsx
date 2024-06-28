import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(false);
  const [character, setChatacter] = useState(false);
  const [length, setLength] = useState(8);

  const copyRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (character) {
      str += "~`!@#$%^&*()_-+={[}]|:;'<,>.?/";
    }
    if (number) {
      str += "1234567890";
    }

    for (let index = 1; index <= length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [setPassword, number, character, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, character, number]);

  const copyToClip = useCallback(() => {
    copyRef.current.select();
    copyRef.current.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="container">
        <h1 className="heading">password generator</h1>
        <div className="passwordContainer">
          <input
            ref={copyRef}
            type="text"
            className="passwordInput"
            placeholder="password"
            value={password}
            readOnly
          />

          <button onClick={()=> {copyToClip()}} className="Btn">
            <span className="text">Copy</span>
            <span className="svgIcon">
              <svg
                fill="white"
                viewBox="0 0 384 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="optionsContainer">
          <input
            className="range"
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="length">Length: {length}</label>
          <div>
            <input
              onChange={() => {
                setNumber((prev) => !prev);
              }}
              type="checkbox"
              id="numberInput"
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div>
            <input
              onChange={() => {
                setChatacter((prev) => !prev);
              }}
              type="checkbox"
              id="characterInput"
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
