import logo from "../assets/logo.webp";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <img src={logo} alt="Loading..." className="w-16 h-16 object-contain" />
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#131316] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-[#131316] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-[#131316] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
