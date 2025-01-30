import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const api = {
  base: import.meta.env.VITE_API_BASE_URL,
};

const Home = () => {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);

  // Fetch gifts from API
  const fetchGifts = async () => {
    try {
      const response = await axios.get(`${api.base}/rdraw/gifts`);
      setGifts(response.data.data); // Assuming API returns { data: { data: [...] } }
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const colors = [
    "from-red-500 to-orange-500 border-red-500",
    "from-blue-500 to-indigo-500 border-blue-500",
    "from-green-500 to-teal-500 border-green-500",
    "from-purple-500 to-pink-500 border-purple-500",
    "from-yellow-500 to-amber-500 border-yellow-500",
  ];

  return (
    <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
      <h2 className="mb-1 text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
        Raffle Draw
      </h2>
      <p className="mb-12 text-lg text-gray-500">Prize List</p>

      <div className="w-full">
        {gifts.length === 0 ? (
          <p className="text-gray-500 text-center">Loading prizes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, index) => {
              const color = colors[index % colors.length]; // Pick color based on index

              return (
                <div
                  key={gift.Serial}
                  onClick={() => navigate(`/draw/${gift.Serial}`)}
                  className="cursor-pointer"
                >
                  <div className="relative h-[200px] sm:h-[200px] w-full group">
                    <span
                      className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${
                        color.split(" ")[2]
                      } rounded-lg`}
                    />
                    <div
                      className={`relative h-full w-full p-5 bg-white border-2 rounded-lg group-hover:bg-gradient-to-r ${color} group-hover:text-white`}
                    >
                      <h3 className="text-xl font-bold text-blue-800 group-hover:text-white">
                        {gift.Serial}
                      </h3>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white">
                          {gift.Giftname} - {gift.NumberOfGift}
                        </h3>
                      </div>
                      <p className="mt-2 text-xs font-medium text-indigo-500 uppercase group-hover:text-white">
                        ------------
                      </p>
                      <p className="text-gray-600 group-hover:text-white">
                        Winners List
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
