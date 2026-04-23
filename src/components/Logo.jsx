import logoImg from "../assets/logo.png";

export default function Logo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logoImg} alt="EmoVision Logo" className="h-full object-contain" />
      <div className="font-fredoka font-bold text-2xl tracking-tight">
        <span className="text-emo-secondary">Emo</span>
        <span className="text-emo-primary">Vision</span>
      </div>
    </div>
  );
}