import "./index.css";
import { useCallback, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState("Generate your password");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const PasswordGenerator = useCallback(() => {
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "1234567890";
    if (includeSpecialChars) charset += ".@#$&*";

    let password = "";
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(charIndex);
    }

    setPass(password);
  }, [length, includeNumbers, includeSpecialChars]);

  return (
    <>
      <div className="w-full max-w-[600px] mx-auto rounded-xl border-2 border-pink-500 bg-white flex flex-col justify-center p-4 items-center overflow-hidden min-h-[300px] mt-6">
        <label className="text-2xl font-semibold mb-2 text-center">
          Password Generator
        </label>

        <div className="w-full flex flex-col sm:flex-row mb-4 gap-2 sm:gap-0">
          <input
            type="text"
            className="w-full p-3 bg-pink-50 rounded-xl sm:rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none sm:rounded-br-none border-2"
            readOnly
            value={pass}
          />
          <button
            className="p-3 bg-pink-500 rounded-xl sm:rounded-tr-xl sm:rounded-br-xl sm:rounded-tl-none sm:rounded-bl-none border-2 border-black text-white font-semibold hover:bg-pink-600"
            onClick={() => navigator.clipboard.writeText(pass)}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col items-start w-full px-2 sm:px-4">
          <label className="text-lg font-semibold">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            <label className="flex items-center gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="size-4"
              />
              Numbers
            </label>
            <label className="flex items-center gap-2 text-lg font-semibold">
              <input
                type="checkbox"
                checked={includeSpecialChars}
                onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                className="size-4"
              />
              Special Characters
            </label>
          </div>
        </div>

        <button
          onClick={PasswordGenerator}
          className="mt-5 w-full sm:w-auto px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700"
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
