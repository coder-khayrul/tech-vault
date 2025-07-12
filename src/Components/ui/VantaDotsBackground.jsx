import React, { useEffect, useRef, useState } from "react";
import DOTS from "vanta/dist/vanta.dots.min";
import * as THREE from "three";

const VantaDotsBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        DOTS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x615fff,
          color2: 0x615fff,
          backgroundColor: 0x020101, // corrected hex format
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="w-full h-[400px] flex items-center justify-center text-white text-2xl font-bold"
    >
      {/* Optional content inside the background */}
      Welcome to TechScope
    </div>
  );
};

export default VantaDotsBackground;
