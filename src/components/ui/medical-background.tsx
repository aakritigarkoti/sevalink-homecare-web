"use client";

const ICONS = [
  { left: "3%",  top: "10%", size: 32, dur: "14s", delay: "0s" },
  { left: "10%", top: "55%", size: 20, dur: "18s", delay: "1.5s" },
  { left: "18%", top: "30%", size: 38, dur: "12s", delay: "3s" },
  { left: "25%", top: "65%", size: 24, dur: "16s", delay: "0.8s" },
  { left: "33%", top: "15%", size: 28, dur: "20s", delay: "2s" },
  { left: "42%", top: "48%", size: 16, dur: "13s", delay: "4s" },
  { left: "50%", top: "8%",  size: 30, dur: "17s", delay: "1s" },
  { left: "58%", top: "60%", size: 22, dur: "11s", delay: "2.5s" },
  { left: "65%", top: "35%", size: 36, dur: "19s", delay: "0.3s" },
  { left: "73%", top: "20%", size: 18, dur: "15s", delay: "3.5s" },
  { left: "80%", top: "55%", size: 26, dur: "22s", delay: "1.2s" },
  { left: "88%", top: "12%", size: 32, dur: "10s", delay: "4.5s" },
  { left: "93%", top: "45%", size: 20, dur: "16s", delay: "2.8s" },
  { left: "47%", top: "70%", size: 28, dur: "14s", delay: "0.5s" },
];

export function FloatingMedicalIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div style={{
        position: "absolute", top: "25%", left: "25%",
        width: "384px", height: "384px",
        background: "radial-gradient(circle, rgba(167,243,208,0.4) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)"
      }} />
      <div style={{
        position: "absolute", bottom: "25%", right: "25%",
        width: "384px", height: "384px",
        background: "radial-gradient(circle, rgba(167,243,208,0.3) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)"
      }} />
      {ICONS.map((icon, i) => (
        <div
          key={i}
          className="float-icon"
          style={{
            left: icon.left,
            top: icon.top,
            animationDuration: icon.dur,
            animationDelay: icon.delay,
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      ))}
    </div>
  );
}
