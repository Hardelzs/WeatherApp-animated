import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplet, Thermometer,Heart } from 'lucide-react';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState('sunny');
  const [temperature, setTemperature] = useState(72);
  const [humidity, setHumidity] = useState(45);
  const [windSpeed, setWindSpeed] = useState(8);
  const [isDay, setIsDay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Cycle through weather types for demo purposes
  useEffect(() => {
    const weatherTypes = ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy', 'windy'];
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weatherTypes.length);
      setCurrentWeather(weatherTypes[randomIndex]);
      setTemperature(Math.floor(Math.random() * 50) + 30); // 30-80°F
      setHumidity(Math.floor(Math.random() * 70) + 20); // 20-90%
      setWindSpeed(Math.floor(Math.random() * 20) + 1); // 1-20 mph
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Toggle day/night every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay(prev => !prev);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getWeatherIcon = () => {
    switch(currentWeather) {
      case 'sunny':
        return <Sun size={64} color={isDay ? "#FFD700" : "#FFC107"} className={`transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`} />;
      case 'cloudy':
        return <Cloud size={64} color="#CCCCCC" className={`transition-all duration-300 ${isAnimating ? 'translate-x-2' : 'translate-x-0'}`} />;
      case 'rainy':
        return <CloudRain size={64} color="#9AC1E4" className={`transition-all duration-300 ${isAnimating ? 'translate-y-1' : 'translate-y-0'}`} />;
      case 'snowy':
        return <CloudSnow size={64} color="#E3F2FD" className={`transition-all duration-300 ${isAnimating ? 'rotate-12' : 'rotate-0'}`} />;
      case 'stormy':
        return <CloudLightning size={64} color="#757575" className={`transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`} />;
      case 'windy':
        return <Wind size={64} color="#90CAF9" className={`transition-all duration-300 ${isAnimating ? 'translate-x-2' : 'translate-x-0'}`} />;
      default:
        return <Sun size={64} color="#FFD700" />;
    }
  };
  
  const getBackgroundGradient = () => {
    if (isDay) {
      switch(currentWeather) {
        case 'sunny':
          return 'bg-gradient-to-b from-blue-400 to-blue-300';
        case 'cloudy':
          return 'bg-gradient-to-b from-blue-300 to-gray-200';
        case 'rainy':
          return 'bg-gradient-to-b from-gray-400 to-gray-300';
        case 'snowy':
          return 'bg-gradient-to-b from-blue-100 to-gray-100';
        case 'stormy':
          return 'bg-gradient-to-b from-gray-600 to-gray-500';
        case 'windy':
          return 'bg-gradient-to-b from-blue-300 to-blue-200';
        default:
          return 'bg-gradient-to-b from-blue-400 to-blue-300';
      }
    } else {
      // Night gradients
      return 'bg-gradient-to-b from-gray-900 to-blue-900';
    }
  };
  
  // Animated clouds component
  const AnimatedClouds = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {['cloudy', 'rainy', 'snowy', 'stormy'].includes(currentWeather) && (
        <>
          <div className="cloud cloud-1 absolute top-10 opacity-70"></div>
          <div className="cloud cloud-2 absolute top-20 opacity-80"></div>
          <div className="cloud cloud-3 absolute top-5 opacity-60"></div>
        </>
      )}
      {currentWeather === 'rainy' && (
        <div className="rain-container text-black absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="raindrop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random()}s`
            }}></div>
          ))}
        </div>
      )}
      {currentWeather === 'snowy' && (
        <div className="snow-container absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`flex flex-col items-center justify-center h-screen w-full transition-colors duration-1000 ${getBackgroundGradient()}`}>
      <style jsx>{`
        .cloud {
          width: 200px;
          height: 60px;
          background-color: white;
          border-radius: 50px;
          position: absolute;
          animation: float 15s infinite linear;
          opacity: 0.8;
        }
        .cloud:before, .cloud:after {
          content: '';
          position: absolute;
          background-color: white;
          border-radius: 50%;
        }
        .cloud:before {
          width: 100px;
          height: 100px;
          top: -40px;
          left: 25px;
        }
        .cloud:after {
          width: 80px;
          height: 80px;
          top: -30px;
          left: 110px;
        }
        .cloud-1 {
          animation-duration: 25s;
          left: -200px;
        }
        .cloud-2 {
          animation-duration: 35s;
          animation-delay: 5s;
          left: -200px;
        }
        .cloud-3 {
          animation-duration: 30s;
          animation-delay: 15s;
          left: -200px;
        }
        @keyframes float {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        .raindrop {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8));
          animation: rain linear infinite;
        }
        @keyframes rain {
          0% { transform: translateY(-100px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0.3; }
        }
        .snowflake {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          animation: snow linear infinite;
          opacity: 0.8;
        }
        @keyframes snow {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
        }
      `}</style>
      
      <AnimatedClouds />
      
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white border-opacity-20 transition-all duration-500 w-full max-w-md">
        <div className="flex flex-col items-center">
          <h1 className={`text-3xl font-bold mb-4 ${isDay ? 'text-gray-800' : 'text-black'} transition-colors duration-1000`}>
            Weather App
          </h1>
          
          <div className={`flex items-center justify-center p-6 mb-6 rounded-full ${isDay ? 'bg-blue-100 bg-opacity-50' : 'bg-gray-800 bg-opacity-50'} transition-colors duration-1000`}>
            {getWeatherIcon()}
          </div>
          
          <h2 className={`text-4xl font-bold mb-2 ${isDay ? 'text-gray-800' : 'text-black'} transition-colors duration-1000`}>
            {temperature}°F
          </h2>
          
          <p className={`text-xl mb-6 capitalize ${isDay ? 'text-gray-700' : 'text-gray-700'} transition-colors duration-1000`}>
            {currentWeather}
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className={`flex items-center bg-white bg-opacity-20 p-4 rounded-xl ${isAnimating ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
              <Droplet className={`mr-2 ${isDay ? 'text-blue-500' : 'text-blue-300'}`} />
              <div>
                <p className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Humidity</p>
                <p className={`text-lg font-semibold ${isDay ? 'text-gray-800' : 'text-gray-800'}`}>{humidity}%</p>
              </div>
            </div>
            
            <div className={`flex items-center bg-white bg-opacity-20 p-4 rounded-xl ${isAnimating ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
              <Wind className={`mr-2 ${isDay ? 'text-blue-500' : 'text-blue-300'}`} />
              <div>
                <p className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-300'}`}>Wind</p>
                <p className={`text-lg font-semibold ${isDay ? 'text-gray-800' : 'text-gray-800'}`}>{windSpeed} mph</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-600'}`}>Today</span>
              <span className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-600'}`}>5-Day Forecast</span>
            </div>
            
            <div className="flex justify-between">
              {['sunny', 'cloudy', 'rainy', 'snowy', 'stormy'].map((weather, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className={`text-xs mb-1 ${isDay ? 'text-gray-600' : 'text-gray-600'}`}>
                    {new Date(Date.now() + 86400000 * (index + 1)).toLocaleDateString('en-US', {weekday: 'short'})}
                  </p>
                  
                  {weather === 'sunny' && <Sun size={24} color={isDay ? "#FFD700" : "#FFC107"} />}
                  {weather === 'cloudy' && <Cloud size={24} color="#CCCCCC" />}
                  {weather === 'rainy' && <CloudRain size={24} color="#9AC1E4" />}
                  {weather === 'snowy' && <CloudSnow size={24} color="#E3F2FD" />}
                  {weather === 'stormy' && <CloudLightning size={24} color="#757575" />}
                  
                  <p className={`text-xs mt-1 font-medium ${isDay ? 'text-gray-800' : 'text-gray-800'}`}>
                    {Math.floor(Math.random() * 30) + 50}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setIsDay(prev => !prev)}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-full transition"
        >
          Toggle {isDay ? 'Night' : 'Day'} Mode
        </button>
      </div>


      <div className="flex justify-center mt-6">
        <button 
          className=" text-black mt-20 text-2xl absolute flex justify-center items-center gap-2"
        >
          Created With <Heart className='text-red-500'/> by Hardelz
        </button>
      </div>
    </div>
  );
};

export default App;