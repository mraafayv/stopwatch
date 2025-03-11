import { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAnalog, setIsAnalog] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = (milliseconds % 1000) / 10;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(ms).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Stopwatch</h1>
        <button
          onClick={() => setIsAnalog(!isAnalog)}
          className="mb-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer"
        >
          Toggle {isAnalog ? "Digital" : "Analog"} Mode
        </button>

        {isAnalog ? (
          <div className="relative w-40 h-40 mx-auto border-4 m-4 border-white rounded-full flex items-center justify-center">
            <div className="flex justify-center items-end">
              <div
                className="absolute w-1 h-16 bg-transparent border-1 border-red-500 origin-bottom transform"
                style={{
                  left: "50%",
                  transform: `translateX(-50%) rotate(${(time / 1000) * 6}deg)`,
                  transformOrigin: "bottom center",
                }}
              ></div>
              <div
                className="absolute w-1 h-12 bg-yellow-500 origin-bottom transform"
                style={{
                  left: "50%",
                  transform: `translateX(-50%) rotate(${
                    (time / 60000) * 6
                  }deg)`,
                  transformOrigin: "bottom center",
                }}
              ></div>
              <div
                className="absolute w-1 h-8 bg-white origin-bottom transform"
                style={{
                  left: "50%",
                  transform: `translateX(-50%) rotate(${
                    (time / 3600000) * 30
                  }deg)`,
                  transformOrigin: "bottom center",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-4xl font-mono mb-6">{formatTime(time)}</div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded text-white hover:cursor-pointer ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600 "
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
