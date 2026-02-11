"use client";

import { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

export default function QRCode({ url, size = 96 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR Code generation error:', error);
        }
      );
    }
  }, [url, size]);

  return (
    <div className="w-24 h-24 bg-white border border-gray-200 p-1">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
