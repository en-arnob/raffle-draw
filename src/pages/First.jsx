import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import Lottie from "react-lottie";
import animationData from "../assets/spin.json";

const defaultOptions = {
  loop: true,
  autoplay: true, // Ensure the animation plays automatically
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const First = () => {
  const { serial } = useParams(); // Retrieve the serial parameter from the URL
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 7000); // Stop after 5s
  };

  const getWinners = async () => {
    setLoading(true); // Set loading to true when making the request.
    try {
      const response = await axios.get(`${api.base}/rdraw/winners/${serial}`); // Use serial from URL parameter
      if (response.data.data.length > 0) {
        handleCelebrate();
      }
      setWinners(response.data.data || []); // Ensure data exists
      // console.log("Fetched winners:", response.data.data);
    } catch (error) {
      console.error("Error fetching winners:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    getWinners(); // Fetch winners when the component mounts
  }, [serial]); // Re-run if serial changes

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulating animation delay

      const drawd = await axios.post(`${api.base}/rdraw/makedraw/${serial}`);
      // console.log(drawd);

      if (drawd.data && drawd.data.status === "OK") {
        // console.log("Draw successfully initiated");
        handleCelebrate();
        setWinners(drawd.data.data);
      } else {
        console.error("Error: Draw initiation failed", drawd.data);
      }
    } catch (error) {
      console.error("Error during draw:", error);
    } finally {
      setIsDrawing(false); // Stop drawing state once the process is done
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {showConfetti && <Confetti width={width} height={height} />}
      {/* Loading Spinner or Message */}
      {loading && <div>Loading...</div>}

      {/* Show the Draw Button if no winners yet */}
      {!loading && winners.length === 0 && !isDrawing && (
        <button
          onClick={handleDraw}
          className="cursor-pointer px-6 py-3 text-2xl font-semibold text-white bg-blue-700 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-auto max-w-xs mx-auto"
        >
          Draw 🥳 {serial}
        </button>
      )}

      {/* If winners are fetched or after animation, display them in a table */}
      {!loading && winners.length > 0 && !isDrawing && (
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Winners of <span>{winners[0].xgift}</span></h2>
          <table
            style={{
              margin: "20px auto",
              borderCollapse: "collapse",
              width: "80%",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Employee ID
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Prize
                </th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {winner.xemp}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {winner.xgift}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display a "Drawing" state */}
      {isDrawing && (
        <div>
          {" "}
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </div>
  );
};

export default First;
