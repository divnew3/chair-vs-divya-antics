import { useState, useEffect } from "react";
import divyaAvatar from "@/assets/divya-avatar.png";
import chairImage from "@/assets/chair.png";

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
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [divyaState, setDivyaState] = useState<"normal" | "hit" | "spinning">("normal");
  const [showImpact, setShowImpact] = useState(false);

  const launchAttack = () => {
    if (isAttacking) return;
    
    setIsAttacking(true);
    setDivyaState("normal");
    setCurrentMessage("");
    setShowImpact(false);
    
    // Chair hits after animation completes
    setTimeout(() => {
      // Impact moment
      setShowImpact(true);
      setDivyaState("hit");
      const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setCurrentMessage(randomMessage);
      
      // Shake effect
      setTimeout(() => {
        setDivyaState("spinning");
      }, 500);
      
      // Reset everything
      setTimeout(() => {
        setIsAttacking(false);
        setDivyaState("normal");
        setShowImpact(false);
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Title */}
      <h1 className="font-comic text-6xl md:text-8xl mb-8 text-foreground animate-bounce-slow">
        <span className="text-primary">Chair</span>
        <span className="text-foreground mx-3">vs</span>
        <span className="text-accent">Divya</span>
      </h1>
      
      {/* Game Arena */}
      <div className="relative w-full max-w-md h-96 flex items-center justify-center">
        
        {/* Flying Chair */}
        {isAttacking && (
          <div className={`absolute left-0 z-20 ${isAttacking ? 'animate-chair-fly' : ''}`}>
            <img 
              src={chairImage} 
              alt="Flying chair" 
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>
        )}
        
        {/* Impact Effect */}
        {showImpact && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="impact-text text-impact animate-pulse">
              POW!
            </div>
          </div>
        )}
        
        {/* Divya Avatar */}
        <div className="flex flex-col items-center">
          <div 
            className={`
              transition-all duration-300 
              ${divyaState === "hit" ? "animate-shake" : ""}
              ${divyaState === "spinning" ? "animate-spin-fall" : ""}
            `}
          >
            <img 
              src={divyaAvatar} 
              alt="Divya avatar" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              style={{
                filter: divyaState !== "normal" ? "hue-rotate(30deg)" : "none",
              }}
            />
          </div>
          <h2 className="font-comic text-3xl md:text-4xl mt-4 text-foreground">
            Divya
          </h2>
        </div>
      </div>
      
      {/* Funny Message */}
      {currentMessage && (
        <div className="mt-8 p-4 bg-secondary rounded-lg shadow-[var(--shadow-comic)] animate-bounce">
          <p className="font-comic text-xl md:text-2xl text-secondary-foreground">
            {currentMessage}
          </p>
        </div>
      )}
      
      {/* Attack Button */}
      <button
        onClick={launchAttack}
        disabled={isAttacking}
        className={`
          mt-8 px-8 py-4 
          font-comic text-xl md:text-2xl
          bg-gradient-to-r from-primary to-primary-glow
          text-primary-foreground
          rounded-lg
          shadow-[var(--shadow-comic)]
          transition-all duration-200
          hover:scale-105 hover:shadow-[var(--shadow-glow)]
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          ${!isAttacking ? "hover:animate-pulse" : ""}
        `}
      >
        Attack Divya with a Chair 💺⚡
      </button>
      
      {/* Sound effect indicator */}
      {showImpact && (
        <div className="fixed top-10 right-10 animate-bounce">
          <div className="bg-impact text-white px-4 py-2 rounded-full font-comic text-lg">
            🔊 BONK!
          </div>
        </div>
      )}
    </div>
  );
}