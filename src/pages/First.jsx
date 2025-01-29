import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/spin.json";

const First = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [winners, setWinners] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true, // Ensure the animation plays automatically
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Hardcoded winners data
  const hardcodedWinners = [
    { name: "John Doe", prize: "Car", date: "2025-01-29" },
    { name: "Jane Smith", prize: "Laptop", date: "2025-01-28" },
    { name: "Alice Johnson", prize: "Phone", date: "2025-01-27" },
    { name: "Bob Brown", prize: "Gift Card", date: "2025-01-26" },
  ];

  // Function to simulate the "Draw" button action
  const handleDraw = async () => {
    setIsDrawing(true);
    setAnimationComplete(false);

    // Wait for the animation to complete (simulate with setTimeout)
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Assuming animation takes 3 seconds

    // After the animation, set the hardcoded winners data
    setWinners(hardcodedWinners);

    // After data is set, show the table
    setAnimationComplete(true);
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
      {!isDrawing && !animationComplete ? (
        <div className="h-screen w-screen bg-black flex justify-center items-center">
          <div className="relative inline-flex  group">
            <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <p
              onClick={handleDraw}
              title="Get quote now"
              className="cursor-pointer relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              Draw
            </p>
          </div>
        </div>
      ) : null}

      {isDrawing && !animationComplete ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : null}

      {animationComplete && winners.length > 0 ? (
        <table
          style={{
            marginTop: "20px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Prize
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {winner.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {winner.prize}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {winner.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default First;
