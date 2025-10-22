import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-slate-800 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-slate-400 font-oswald flex items-center justify-center gap-2">
          © 2025 Cairo Blockchain Week • Built by{" "}
          <a
            href="https://mercaturaforum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E3D8] via-[#C400FF] to-[#3C6EFF] font-semibold hover:brightness-125 transition"
          >
            Mercatura Forum
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
