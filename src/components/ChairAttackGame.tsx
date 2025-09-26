import { useState } from "react";

const funnyMessages = [
  "Ouch, poor Divya 😵",
  "The chair wins again!",
  "Bonk attack successful ✅",
  "Chair: 1, Divya: 0 🪑",
  "Critical hit! 💥",
  "Divya has been chaired! 🎯",
  "That's gotta hurt! 🤕",
  "Chair used BONK! It's super effective!",
  "RIP Divya's dignity 😂",
  "Divya.exe has stopped working 🖥️"
];

export default function ChairAttackGame() {
  const [chairs, setChairs] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [divyaState, setDivyaState] = useState<"normal" | "hit">("normal");
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chairIdCounter, setChairIdCounter] = useState(0);

  const throwChair = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new chair at click position
    const newChairId = chairIdCounter + 1;
    setChairIdCounter(newChairId);
    setChairs(prev => [...prev, { id: newChairId, x, y }]);
    
    // Trigger impact after animation
    setTimeout(() => {
      setDivyaState("hit");
      const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      
      // Reset Divya after shake
      setTimeout(() => {
        setDivyaState("normal");
      }, 500);
      
      // Hide message after a bit
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }, 600);
    
    // Remove chair after animation completes
    setTimeout(() => {
      setChairs(prev => prev.filter(chair => chair.id !== newChairId));
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden cursor-crosshair"
      style={{ background: 'linear-gradient(135deg, #e8d5f2 0%, #f4d0e1 50%, #e8d5f2 100%)' }}
      onClick={throwChair}
    >
      {/* Flying Chairs */}
      {chairs.map(chair => (
        <div
          key={chair.id}
          className="absolute pointer-events-none"
          style={{
            left: `${chair.x}px`,
            top: `${chair.y}px`,
            animation: 'chairFlyToCenter 0.8s ease-out forwards'
          }}
        >
          <span className="text-4xl">🪑</span>
        </div>
      ))}
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center pointer-events-none">
        {/* Divya Avatar - Simple Circle */}
        <div className={`relative ${divyaState === "hit" ? "animate-shake" : ""}`}>
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{ backgroundColor: 'hsl(var(--avatar-bg))' }}
          >
            {/* Hair */}
            <div 
              className="absolute top-0 w-full h-8 rounded-t-full"
              style={{ backgroundColor: 'hsl(var(--avatar-hair))' }}
            />
            {/* Face */}
            <div className="relative z-10">
              {/* Eyes */}
              <div className="flex gap-3 mb-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
              {/* Smile */}
              <svg width="30" height="15" className="mx-auto">
                <path
                  d="M 5 5 Q 15 12 25 5"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Name Badge */}
        <div className="mt-4 px-6 py-2 bg-white rounded-full shadow-md">
          <span className="text-primary font-medium">divya</span>
        </div>
        
        {/* Instruction Card */}
        <div className="mt-8 px-8 py-6 bg-white/90 backdrop-blur rounded-2xl shadow-[var(--shadow-card)] text-center">
          <h2 className="text-2xl font-medium text-primary mb-2">
            Click anywhere to throw a chair!
          </h2>
          <p className="text-muted-foreground">
            Playful stress relief ✨
          </p>
        </div>
        
        {/* Funny Message Popup */}
        {showMessage && (
          <div className="absolute top-1/4 px-6 py-3 bg-white rounded-full shadow-lg animate-bounce pointer-events-none">
            <span className="text-lg font-medium text-foreground">{currentMessage}</span>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes chairFlyToCenter {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate(calc(50vw - var(--click-x, 0) * 1px - 20px), calc(50vh - var(--click-y, 0) * 1px - 200px)) rotate(720deg) scale(1.5);
          }
        }
        
        ${chairs.map(chair => `
          [style*="left: ${chair.x}px"] {
            --click-x: ${chair.x};
            --click-y: ${chair.y};
          }
        `).join('')}
      `}</style>
    </div>
  );
}