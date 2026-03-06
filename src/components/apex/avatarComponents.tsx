// avatarComponents.tsx — all SVG avatar components
// Kept in a separate file so ScreenPersonas.tsx can satisfy Vite Fast Refresh rules
// (a file with only React component exports is Fast-Refresh compatible)

export function AvatarAria() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-aria" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-aria)" />
      <path d="M15 120 Q60 100 105 120" fill="#1c1917" />
      <path d="M38 104 Q60 96 82 104" stroke="#fbbf24" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#b5763a" />
      <ellipse cx="60" cy="42" rx="29" ry="20" fill="#111" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c8834a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c8834a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c8834a" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b5763a" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b5763a" />
      <circle cx="60" cy="28" r="12" fill="#111" />
      <ellipse cx="60" cy="38" rx="14" ry="8" fill="#111" />
      <path d="M33 52 Q36 44 42 48" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M87 52 Q84 44 78 48" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M42 63 Q50 58 57 62" stroke="#1a0f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 62 Q70 58 78 63" stroke="#1a0f00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="6.5" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="6.5" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#2d1a08" />
      <circle cx="71" cy="69" r="4" fill="#2d1a08" />
      <circle cx="52.5" cy="67.5" r="1.2" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.2" fill="white" />
      <path d="M44 65 Q50 62 56 65" stroke="#111" strokeWidth="1.5" fill="none" />
      <path d="M64 65 Q70 62 76 65" stroke="#111" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 82 63 76" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="78" r="1.5" fill="#a06030" opacity="0.5" />
      <circle cx="64" cy="78" r="1.5" fill="#a06030" opacity="0.5" />
      <path d="M49 86 Q60 93 71 86" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M49 86 Q60 95 71 86" fill="#c0392b" opacity="0.3" />
      <circle cx="33" cy="80" r="2.5" fill="#fbbf24" />
      <circle cx="87" cy="80" r="2.5" fill="#fbbf24" />
    </svg>
  );
}

export function AvatarFelix() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-felix" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-felix)" />
      <path d="M10 120 Q60 98 110 120" fill="#1e293b" />
      <path d="M57 100 L60 88 L63 100 L60 108 Z" fill="#2563eb" />
      <path d="M48 100 L60 88 L72 100" stroke="white" strokeWidth="2" fill="none" />
      <rect x="54" y="88" width="12" height="15" rx="4" fill="#e8c9a0" />
      <ellipse cx="60" cy="42" rx="28" ry="19" fill="#1a0f05" />
      <path d="M42 38 Q50 32 60 36 Q70 32 80 38" fill="#1a0f05" />
      <path d="M38 48 Q42 36 50 34" stroke="#2a1a0a" strokeWidth="1.5" fill="none" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <ellipse cx="86" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <rect x="38" y="63" width="18" height="13" rx="4" stroke="#334155" strokeWidth="2" fill="none" />
      <rect x="64" y="63" width="18" height="13" rx="4" stroke="#334155" strokeWidth="2" fill="none" />
      <line x1="56" y1="69" x2="64" y2="69" stroke="#334155" strokeWidth="2" />
      <line x1="36" y1="66" x2="32" y2="64" stroke="#334155" strokeWidth="2" />
      <line x1="84" y1="66" x2="88" y2="64" stroke="#334155" strokeWidth="2" />
      <path d="M40 62 Q47 59 55 62" stroke="#1a0f05" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 62 Q72 59 80 62" stroke="#1a0f05" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="47" cy="69" rx="5" ry="4.5" fill="white" />
      <ellipse cx="73" cy="69" rx="5" ry="4.5" fill="white" />
      <circle cx="47" cy="69" r="3" fill="#1a3a6a" />
      <circle cx="73" cy="69" r="3" fill="#1a3a6a" />
      <circle cx="48" cy="68" r="1" fill="white" />
      <circle cx="74" cy="68" r="1" fill="white" />
      <path d="M58 76 Q60 81 62 76" stroke="#c4a070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M51 86 Q60 90 69 86" stroke="#9a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarOrion() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-orion" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-orion)" />
      <path d="M8 120 Q60 96 112 120" fill="#1c1917" />
      <path d="M40 104 Q60 97 80 104" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#7a4a28" />
      <ellipse cx="60" cy="42" rx="28" ry="18" fill="#111" />
      <circle cx="48" cy="38" r="3" fill="#1a1a1a" />
      <circle cx="55" cy="35" r="3.5" fill="#1a1a1a" />
      <circle cx="63" cy="34" r="3.5" fill="#1a1a1a" />
      <circle cx="71" cy="37" r="3" fill="#1a1a1a" />
      <circle cx="52" cy="42" r="2.5" fill="#222" />
      <circle cx="68" cy="41" r="2.5" fill="#222" />
      <path d="M33 68 Q33 90 45 100 Q60 106 75 100 Q87 90 87 68 Q87 50 60 48 Q33 50 33 68Z" fill="#7a4a28" />
      <ellipse cx="33" cy="72" rx="5" ry="8" fill="#7a4a28" />
      <ellipse cx="87" cy="72" rx="5" ry="8" fill="#7a4a28" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4.5" fill="#6a3a1a" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4.5" fill="#6a3a1a" />
      <path d="M40 63 Q49 59 57 63" stroke="#0a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#0a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1a3a1a" />
      <circle cx="72" cy="70" r="4" fill="#1a3a1a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M56 77 Q60 83 64 77" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="55" cy="79" r="2" fill="#5a3010" opacity="0.5" />
      <circle cx="65" cy="79" r="2" fill="#5a3010" opacity="0.5" />
      <path d="M50 88 Q60 93 70 88" stroke="#4a2010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarMaya() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-maya" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#831843" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-maya)" />
      <path d="M5 120 Q60 98 115 120" fill="#1c1917" />
      <path d="M38 104 Q60 96 82 104" stroke="#f472b6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4a070" />
      <path d="M32 52 Q28 40 34 30 Q40 20 55 22 Q70 20 78 28 Q88 38 86 52" fill="#7a2a10" />
      <ellipse cx="60" cy="38" rx="28" ry="18" fill="#8B3A1A" />
      <path d="M86 55 Q92 65 88 80 Q86 90 82 98" stroke="#7a2a10" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M34 55 Q28 65 32 80 Q34 90 38 98" stroke="#7a2a10" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M50 24 Q55 18 62 22" stroke="#c4602a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 22 Q72 18 78 26" stroke="#c4602a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#e8c090" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#e8c090" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#e8c090" />
      <path d="M42 63 Q50 58 57 62" stroke="#5a2a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 62 Q70 58 78 63" stroke="#5a2a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#5a2a10" />
      <circle cx="71" cy="69" r="4" fill="#5a2a10" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#3a1a05" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#3a1a05" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M48 86 Q60 95 72 86" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#f472b6" opacity="0.2" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#f472b6" opacity="0.2" />
      <circle cx="34" cy="79" r="3" fill="#f472b6" opacity="0.8" />
      <circle cx="86" cy="79" r="3" fill="#f472b6" opacity="0.8" />
    </svg>
  );
}

export function AvatarTheo() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-theo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-theo)" />
      <path d="M5 120 Q60 100 115 120" fill="#1e1b4b" />
      <path d="M40 104 Q60 97 80 104" stroke="#a78bfa" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0c090" />
      <ellipse cx="60" cy="40" rx="30" ry="20" fill="#1a1a2a" />
      <path d="M38 38 Q34 28 40 22" stroke="#1a1a2a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M50 34 Q48 24 54 20" stroke="#1a1a2a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M65 33 Q68 22 74 24" stroke="#1a1a2a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M75 38 Q82 30 80 22" stroke="#1a1a2a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M44 42 Q38 36 36 28" stroke="#222235" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5a0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#ddc080" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#ddc080" />
      <ellipse cx="60" cy="90" rx="18" ry="8" fill="#c0a070" opacity="0.3" />
      {[48,52,56,60,64,68,72,50,54,58,62,66,70].map((x, i) => (
        <circle key={i} cx={x} cy={88 + i % 3 * 3} r="0.8" fill="#8a6040" opacity="0.6" />
      ))}
      <path d="M40 63 Q49 60 57 63" stroke="#1a1a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 80 63" stroke="#1a1a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a5a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a5a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M51 87 Q60 92 69 87" stroke="#9a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarLex() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-lex" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-lex)" />
      <path d="M8 120 Q60 98 112 120" fill="#0f172a" />
      <path d="M40 104 Q60 97 80 104" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c09060" />
      <ellipse cx="60" cy="40" rx="27" ry="17" fill="#555" />
      <path d="M45 32 Q50 26 56 30" stroke="#ccc" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 28 Q65 22 70 28" stroke="#ccc" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M72 33 Q78 28 80 36" stroke="#aaa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M33 52 Q32 44 36 38" stroke="#555" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M87 52 Q88 44 84 38" stroke="#555" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#c4956a" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#c4956a" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#c4956a" />
      <ellipse cx="34" cy="72" rx="2.5" ry="4" fill="#b4855a" />
      <ellipse cx="86" cy="72" rx="2.5" ry="4" fill="#b4855a" />
      <path d="M41 63 Q49 60 57 63" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 79 63" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5" fill="white" />
      <circle cx="50" cy="70" r="3.8" fill="#1a4a5a" />
      <circle cx="72" cy="70" r="3.8" fill="#1a4a5a" />
      <circle cx="51.5" cy="68.5" r="1.2" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.2" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#a07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M52 87 Q60 90 68 87" stroke="#7a5030" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarHana() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-hana" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-hana)" />
      <path d="M5 120 Q60 99 115 120" fill="#1c1917" />
      <path d="M38 104 Q60 96 82 104" stroke="#fb7185" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <path d="M32 50 Q26 65 28 85 Q30 100 35 110" stroke="#1a0f05" strokeWidth="12" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#1a0f05" />
      <path d="M88 50 Q94 65 92 85 Q90 100 85 110" stroke="#1a0f05" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M36 52 Q32 68 34 88" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 52 Q88 68 86 88" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M50 28 Q54 20 60 24" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#d4956a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#d4956a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#d4956a" />
      <path d="M42 63 Q50 60 57 63" stroke="#3a1a05" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 60 78 63" stroke="#3a1a05" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#3a1a10" />
      <circle cx="71" cy="69" r="4" fill="#3a1a10" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#1a0a00" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#1a0a00" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#b07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 86 Q60 94 71 86" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#fb7185" opacity="0.2" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#fb7185" opacity="0.2" />
      <circle cx="33" cy="79" r="2" fill="#fb7185" opacity="0.9" />
      <circle cx="87" cy="79" r="2" fill="#fb7185" opacity="0.9" />
    </svg>
  );
}

export function AvatarSage() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-sage" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-sage)" />
      <path d="M8 120 Q60 97 112 120" fill="#1c1917" />
      <path d="M40 104 Q60 97 80 104" stroke="#fb923c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c4845a" />
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#3a2a1a" />
      <path d="M38 44 Q42 34 50 32 Q60 28 70 32 Q78 34 82 44" fill="#3a2a1a" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <path d="M40 63 Q49 59 57 63" stroke="#1a0f05" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#1a0f05" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q60 96 73 86" stroke="#7a3a10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q44 82 46 78" stroke="#b07040" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M73 86 Q76 82 74 78" stroke="#b07040" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function AvatarMarcus() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-marcus" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-marcus)" />
      <path d="M5 120 Q60 96 115 120" fill="#1e3a5f" />
      <path d="M48 100 L54 90 L60 96 L66 90 L72 100" fill="#1e3a5f" stroke="#2a4a6f" strokeWidth="1" />
      <path d="M48 100 L54 90" stroke="#2d5a8f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M72 100 L66 90" stroke="#2d5a8f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="60" y1="96" x2="60" y2="120" stroke="#2a4a6f" strokeWidth="1" opacity="0.6" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#8B6040" />
      <ellipse cx="60" cy="41" rx="27" ry="17" fill="#555" />
      <path d="M38 44 Q42 34 52 32 Q60 28 68 32 Q78 34 82 44" fill="#555" />
      <ellipse cx="36" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="84" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#8B6040" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#8B6040" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#8B6040" />
      <path d="M42 66 Q44 64 46 66" stroke="#7a5030" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M74 66 Q76 64 78 66" stroke="#7a5030" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M44 58 Q52 56 58 58" stroke="#7a5030" strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M62 58 Q68 56 76 58" stroke="#7a5030" strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M40 63 Q49 60 57 63" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 80 63" stroke="#2a1a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#3a2a1a" />
      <circle cx="72" cy="70" r="4" fill="#3a2a1a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#7a5030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 87 Q60 92 70 87" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarDonna() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-donna" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#431407" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-donna)" />
      <path d="M5 120 Q60 97 115 120" fill="#2d4a1e" />
      <path d="M50 102 L55 92 L60 98 L65 92 L70 102" fill="#2d4a1e" stroke="#3a5a28" strokeWidth="1" />
      <path d="M50 102 L55 92" stroke="#4a6a35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70 102 L65 92" stroke="#4a6a35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="60" y1="98" x2="60" y2="120" stroke="#3a5a28" strokeWidth="1.5" opacity="0.7" />
      <circle cx="60" cy="102" r="1.2" fill="#4a6a35" />
      <circle cx="60" cy="108" r="1.2" fill="#4a6a35" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0b080" />
      <ellipse cx="60" cy="42" rx="28" ry="17" fill="#8a6a30" />
      <path d="M33 52 Q30 62 32 72 Q34 80 38 84" stroke="#8a6a30" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M87 52 Q90 62 88 72 Q86 80 82 84" stroke="#8a6a30" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M36 46 Q40 34 50 30 Q60 26 70 30 Q80 34 84 46" fill="#8a6a30" />
      <path d="M50 28 Q56 22 62 26" stroke="#a88040" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d0a0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d0a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d0a0" />
      <path d="M42 63 Q50 59 57 63" stroke="#5a3a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 59 78 63" stroke="#5a3a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#2a4a2a" />
      <circle cx="71" cy="69" r="4" fill="#2a4a2a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M57 76 Q60 81 63 76" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 86 Q60 93 71 86" stroke="#8B5030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#fb923c" opacity="0.15" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#fb923c" opacity="0.15" />
    </svg>
  );
}

export function AvatarRay() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-ray" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-ray)" />
      <path d="M8 120 Q60 96 112 120" fill="#374151" />
      <path d="M8 120 Q30 110 50 107" stroke="#fbbf24" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M70 107 Q90 110 112 120" stroke="#fbbf24" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M50 102 L55 92 L60 97 L65 92 L70 102" fill="#374151" stroke="#4b5563" strokeWidth="1" />
      <path d="M50 102 L55 92" stroke="#6b7280" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70 102 L65 92" stroke="#6b7280" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c09060" />
      <ellipse cx="60" cy="40" rx="27" ry="15" fill="#3a2a1a" />
      <ellipse cx="60" cy="90" rx="22" ry="10" fill="#3a2a1a" opacity="0.4" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c09060" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c09060" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c09060" />
      {[44,48,52,56,60,64,68,72,76,46,50,54,58,62,66,70,74].map((x, i) => (
        <circle key={i} cx={x} cy={88 + i % 4 * 2.5} r="0.9" fill="#2a1a0a" opacity="0.5" />
      ))}
      <path d="M40 63 Q49 60 57 63" stroke="#1a0f05" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 80 63" stroke="#1a0f05" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1a3a5a" />
      <circle cx="72" cy="70" r="4" fill="#1a3a5a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#a07040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 87 Q60 92 70 87" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarClaire() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-claire" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-claire)" />
      <path d="M5 120 Q60 97 115 120" fill="#0f172a" />
      <path d="M5 120 Q20 108 35 100 L48 102 L54 90 L60 96" fill="#1e293b" />
      <path d="M115 120 Q100 108 85 100 L72 102 L66 90 L60 96" fill="#1e293b" />
      <path d="M35 100 L42 95" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M85 100 L78 95" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M52 94 Q60 88 68 94" stroke="#f1f5f9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M54 97 Q60 92 66 97" stroke="#f1f5f9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      <ellipse cx="60" cy="38" rx="27" ry="16" fill="#5a3a1a" />
      <circle cx="60" cy="26" r="9" fill="#5a3a1a" />
      <ellipse cx="60" cy="34" rx="12" ry="7" fill="#5a3a1a" />
      <path d="M35 50 Q32 42 36 36" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M85 50 Q88 42 84 36" stroke="#5a3a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path d="M42 63 Q50 59 57 63" stroke="#3a2010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 59 78 63" stroke="#3a2010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#1a3a2a" />
      <circle cx="71" cy="69" r="4" fill="#1a3a2a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#2a1a05" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#2a1a05" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 86 Q60 93 71 86" stroke="#7a5030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="79" r="3" fill="white" opacity="0.9" />
      <circle cx="86" cy="79" r="3" fill="white" opacity="0.9" />
    </svg>
  );
}

export function AvatarTony() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-tony" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-tony)" />
      <path d="M8 120 Q60 96 112 120" fill="#3d3a1a" />
      <path d="M8 120 Q28 112 48 108" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M72 108 Q92 112 112 120" stroke="#f97316" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M49 102 L54 91 L60 97 L66 91 L71 102" fill="#3d3a1a" stroke="#5a5620" strokeWidth="1" />
      <path d="M49 102 L54 91" stroke="#6a6228" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M71 102 L66 91" stroke="#6a6228" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#b07840" />
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#1a0f05" />
      <path d="M36 46 Q38 34 46 30 Q54 26 60 28 Q68 26 76 30 Q84 34 84 46" fill="#1a0f05" />
      <path d="M50 84 Q55 82 60 84 Q65 82 70 84" stroke="#1a0f05" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#b07840" />
      <ellipse cx="32" cy="72" rx="5" ry="8" fill="#b07840" />
      <ellipse cx="88" cy="72" rx="5" ry="8" fill="#b07840" />
      <path d="M40 63 Q49 59 57 63" stroke="#0a0500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#0a0500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#8a5020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 90 Q60 95 70 90" stroke="#5a2a10" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarPriya() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-priya" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4c0519" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-priya)" />
      <path d="M5 120 Q60 97 115 120" fill="#f8fafc" />
      <path d="M5 120 Q18 110 32 102 L46 104 L53 92 L60 97" fill="#e2e8f0" />
      <path d="M115 120 Q102 110 88 102 L74 104 L67 92 L60 97" fill="#e2e8f0" />
      <path d="M32 102 L40 97" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
      <path d="M88 102 L80 97" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
      <path d="M50 100 L55 91 L60 96 L65 91 L70 100" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="60" cy="108" r="2" fill="#cbd5e1" />
      <circle cx="60" cy="115" r="2" fill="#cbd5e1" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c08060" />
      <path d="M31 50 Q25 68 28 90 Q32 108 38 116" stroke="#0a0500" strokeWidth="13" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#0a0500" />
      <path d="M89 50 Q95 68 92 90 Q88 108 82 116" stroke="#0a0500" strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M60 24 L60 44" stroke="#1a0f05" strokeWidth="2" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c08060" />
      <ellipse cx="32" cy="72" rx="5" ry="7" fill="#c08060" />
      <ellipse cx="88" cy="72" rx="5" ry="7" fill="#c08060" />
      <path d="M42 63 Q50 59 57 63" stroke="#1a0500" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 59 78 63" stroke="#1a0500" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#1a0a00" />
      <circle cx="71" cy="69" r="4" fill="#1a0a00" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#0a0500" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#0a0500" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#a06040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 86 Q60 93 71 86" stroke="#7a4020" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="56" r="2" fill="#fb7185" opacity="0.9" />
      <circle cx="32" cy="78" r="3" fill="#fbbf24" opacity="0.9" />
      <circle cx="88" cy="78" r="3" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
}

export function AvatarRex() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-rex" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-rex)" />
      <path d="M5 120 Q60 96 115 120" fill="#1c0a0a" />
      <path d="M5 120 Q22 108 38 100 L50 103 L56 90 L60 96" fill="#2d1010" />
      <path d="M115 120 Q98 108 82 100 L70 103 L64 90 L60 96" fill="#2d1010" />
      <path d="M54 94 Q60 88 66 94" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <ellipse cx="60" cy="40" rx="27" ry="16" fill="#1a0a0a" />
      <path d="M36 44 Q40 32 52 30 Q60 26 68 30 Q80 32 84 44" fill="#1a0a0a" />
      <path d="M44 32 Q52 26 60 28" stroke="#3a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <path d="M40 62 Q49 57 57 62" stroke="#1a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M63 62 Q71 57 80 62" stroke="#1a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#7f1d1d" />
      <circle cx="72" cy="70" r="4" fill="#7f1d1d" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M52 87 Q62 93 70 87" stroke="#7a3010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarViper() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-viper" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-viper)" />
      <path d="M5 120 Q60 96 115 120" fill="#1a0a10" />
      <path d="M5 120 Q20 108 36 100 L50 103 L55 90 L60 96" fill="#2a1020" />
      <path d="M115 120 Q100 108 84 100 L70 103 L65 90 L60 96" fill="#2a1020" />
      <path d="M54 94 Q60 88 66 94" stroke="#fb7185" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      <ellipse cx="60" cy="40" rx="28" ry="17" fill="#0a0505" />
      <path d="M36 46 Q38 32 50 28 Q60 24 72 28 Q82 32 84 46" fill="#0a0505" />
      <path d="M82 44 Q88 36 84 28" stroke="#0a0505" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path d="M41 62 Q50 58 57 62" stroke="#0a0505" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 62 Q70 58 79 62" stroke="#0a0505" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="69" r="4" fill="#881337" />
      <circle cx="72" cy="69" r="4" fill="#881337" />
      <circle cx="51.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="67.5" r="1.3" fill="white" />
      <path d="M57 76 Q60 81 63 76" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M48 87 Q60 96 72 87" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarChase() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-chase" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-chase)" />
      <path d="M8 120 Q60 97 112 120" fill="#1c1008" />
      <path d="M50 102 L55 91 L60 97 L65 91 L70 102" fill="#2a1808" stroke="#3a2010" strokeWidth="1" />
      <path d="M50 102 L55 91" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70 102 L65 91" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#3a1a05" />
      <circle cx="44" cy="36" r="5" fill="#3a1a05" />
      <circle cx="52" cy="30" r="5.5" fill="#3a1a05" />
      <circle cx="62" cy="28" r="5.5" fill="#3a1a05" />
      <circle cx="72" cy="31" r="5" fill="#3a1a05" />
      <circle cx="78" cy="38" r="4.5" fill="#3a1a05" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <path d="M40 63 Q49 59 57 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#7c2d12" />
      <circle cx="72" cy="70" r="4" fill="#7c2d12" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 87 Q60 94 71 87" stroke="#7a3a10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarNova() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-nova" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-nova)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a1030" />
      <path d="M40 104 Q60 97 80 104" stroke="#a78bfa" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#2a1a4a" />
      <path d="M34 50 Q30 38 36 28 Q44 18 60 20 Q76 18 84 28 Q90 38 86 50" fill="#2a1a4a" />
      <path d="M34 50 Q32 60 34 70" stroke="#1a0a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path d="M41 63 Q50 59 57 63" stroke="#2a1a4a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 59 79 63" stroke="#2a1a4a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#4c1d95" />
      <circle cx="72" cy="70" r="4" fill="#4c1d95" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 87 Q60 93 71 87" stroke="#8B5030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="78" r="2" fill="#a78bfa" opacity="0.9" />
    </svg>
  );
}

export function AvatarPixel() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-pixel" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#581c87" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-pixel)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a0a2a" />
      <path d="M40 104 Q60 97 80 104" stroke="#c084fc" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <path d="M31 50 Q26 68 28 90 Q32 108 38 116" stroke="#1a0a2a" strokeWidth="12" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#1a0a2a" />
      <path d="M89 50 Q94 68 92 90 Q88 108 82 116" stroke="#1a0a2a" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M36 46 Q48 36 60 38 Q72 36 84 46" fill="#1a0a2a" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="32" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="88" cy="72" rx="5" ry="7" fill="#c4845a" />
      <circle cx="49" cy="69" r="9" stroke="#581c87" strokeWidth="2" fill="none" />
      <circle cx="71" cy="69" r="9" stroke="#581c87" strokeWidth="2" fill="none" />
      <line x1="58" y1="69" x2="62" y2="69" stroke="#581c87" strokeWidth="2" />
      <path d="M41 63 Q49 60 57 63" stroke="#1a0a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 79 63" stroke="#1a0a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="69" rx="5" ry="4.5" fill="white" />
      <ellipse cx="71" cy="69" rx="5" ry="4.5" fill="white" />
      <circle cx="50" cy="69" r="3" fill="#581c87" />
      <circle cx="72" cy="69" r="3" fill="#581c87" />
      <circle cx="51" cy="68" r="1" fill="white" />
      <circle cx="73" cy="68" r="1" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 87 Q60 92 70 87" stroke="#7a4020" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarBlaze() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-blaze" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#701a75" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-blaze)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a0a20" />
      <path d="M40 104 Q60 97 80 104" stroke="#e879f9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0c090" />
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#2a0a3a" />
      <path d="M38 38 Q34 22 42 16" stroke="#2a0a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M50 32 Q48 16 56 12" stroke="#2a0a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M62 30 Q64 14 70 12" stroke="#2a0a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M74 34 Q80 20 82 16" stroke="#2a0a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="16" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="56" cy="12" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="70" cy="12" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="82" cy="16" r="3" fill="#e879f9" opacity="0.8" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5a0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <path d="M40 62 Q49 58 57 62" stroke="#2a0a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 62 Q71 58 80 62" stroke="#2a0a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#701a75" />
      <circle cx="72" cy="70" r="4" fill="#701a75" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q60 96 73 86" stroke="#9a5030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M58 80 Q60 82 62 80" stroke="#e879f9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarCleo() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-cleo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#134e4a" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-cleo)" />
      <path d="M5 120 Q60 98 115 120" fill="#0a1a18" />
      <path d="M40 104 Q60 97 80 104" stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <path d="M33 52 Q28 66 30 82 Q32 94 36 102" stroke="#3a1a05" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#3a1a05" />
      <path d="M87 52 Q92 66 90 82 Q88 94 84 102" stroke="#3a1a05" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M36 46 Q40 32 52 28 Q60 24 68 28 Q80 32 84 46" fill="#3a1a05" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c8834a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c8834a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c8834a" />
      <path d="M42 63 Q50 60 57 63" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 60 78 63" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#134e4a" />
      <circle cx="71" cy="69" r="4" fill="#134e4a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#1a0a00" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#1a0a00" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q60 97 73 86" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#2dd4bf" opacity="0.15" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#2dd4bf" opacity="0.15" />
      <circle cx="33" cy="79" r="2.5" fill="#2dd4bf" opacity="0.8" />
      <circle cx="87" cy="79" r="2.5" fill="#2dd4bf" opacity="0.8" />
    </svg>
  );
}

export function AvatarPatch() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-patch" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-patch)" />
      <path d="M8 120 Q60 97 112 120" fill="#0a1a14" />
      <path d="M40 104 Q60 97 80 104" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#f0d5b0" />
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#4a3010" />
      <path d="M36 46 Q40 32 52 28 Q60 24 68 28 Q80 32 84 46" fill="#4a3010" />
      <path d="M36 46 Q34 56 34 64" stroke="#4a3010" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M84 46 Q86 56 86 64" stroke="#4a3010" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5b0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <path d="M41 63 Q49 60 57 63" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 79 63" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#064e3b" />
      <circle cx="72" cy="70" r="4" fill="#064e3b" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#c4a070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 87 Q60 92 70 87" stroke="#9a7050" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarEmber() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-ember" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-ember)" />
      <path d="M5 120 Q60 97 115 120" fill="#0a1810" />
      <path d="M40 104 Q60 97 80 104" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c08060" />
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#1a0a05" />
      <path d="M36 46 Q32 58 34 72 Q36 84 38 94" stroke="#1a0a05" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M84 46 Q88 58 86 72 Q84 84 82 94" stroke="#1a0a05" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M38 44 Q34 32 40 22 Q48 14 60 16 Q72 14 80 22 Q86 32 82 44" fill="#1a0a05" />
      <path d="M36 52 Q34 60 36 68" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 52 Q86 60 84 68" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#8a5030" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#8a5030" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#8a5030" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#7a4020" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#7a4020" />
      <path d="M40 63 Q49 59 57 63" stroke="#0a0a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#0a0a0a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#14532d" />
      <circle cx="72" cy="70" r="4" fill="#14532d" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M56 77 Q60 83 64 77" stroke="#6a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M49 87 Q60 94 71 87" stroke="#4a2010" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarIris() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-iris" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-iris)" />
      <path d="M5 120 Q60 97 115 120" fill="#0a1020" />
      <path d="M5 120 Q20 108 36 100 L50 103 L55 90 L60 96" fill="#1a2030" />
      <path d="M115 120 Q100 108 84 100 L70 103 L65 90 L60 96" fill="#1a2030" />
      <path d="M36 100 L44 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M84 100 L76 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M52 94 Q60 88 68 94" stroke="#f1f5f9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#f0d5b0" />
      <ellipse cx="60" cy="38" rx="27" ry="16" fill="#c8a040" />
      <circle cx="60" cy="26" r="9" fill="#c8a040" />
      <ellipse cx="60" cy="34" rx="12" ry="7" fill="#c8a040" />
      <path d="M35 50 Q32 42 36 36" stroke="#c8a040" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M85 50 Q88 42 84 36" stroke="#c8a040" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path d="M42 63 Q50 59 57 63" stroke="#3a2010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q70 59 78 63" stroke="#3a2010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#0c4a6e" />
      <circle cx="71" cy="69" r="4" fill="#0c4a6e" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path d="M43 65 Q50 61 57 65" stroke="#2a1a05" strokeWidth="1.5" fill="none" />
      <path d="M63 65 Q70 61 77 65" stroke="#2a1a05" strokeWidth="1.5" fill="none" />
      <path d="M57 76 Q60 81 63 76" stroke="#c09060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 87 Q60 92 70 87" stroke="#7a5030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="79" r="2.5" fill="#38bdf8" opacity="0.9" />
      <circle cx="86" cy="79" r="2.5" fill="#38bdf8" opacity="0.9" />
    </svg>
  );
}

export function AvatarShield() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-shield" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-shield)" />
      <path d="M8 120 Q60 97 112 120" fill="#0a1020" />
      <path d="M8 120 Q22 108 38 100 L50 103 L56 90 L60 96" fill="#1a2030" />
      <path d="M112 120 Q98 108 82 100 L70 103 L64 90 L60 96" fill="#1a2030" />
      <path d="M38 100 L46 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M82 100 L74 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M54 94 Q60 88 66 94" stroke="#bfdbfe" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M57 100 L60 88 L63 100 L60 108 Z" fill="#1d4ed8" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c9a0" />
      <ellipse cx="60" cy="41" rx="27" ry="17" fill="#555" />
      <path d="M38 44 Q42 32 52 30 Q60 26 68 30 Q78 32 82 44" fill="#555" />
      <ellipse cx="36" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="84" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#d4a870" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#d4a870" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#d4a870" />
      <path d="M40 63 Q49 60 57 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 60 80 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1e3a5f" />
      <circle cx="72" cy="70" r="4" fill="#1e3a5f" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 82 63 77" stroke="#a07040" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M51 87 Q60 91 69 87" stroke="#7a5030" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function AvatarBuzz() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bg-buzz" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#312e81" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-buzz)" />
      <path d="M5 120 Q60 98 115 120" fill="#0a0a20" />
      <path d="M40 104 Q60 97 80 104" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      <ellipse cx="60" cy="40" rx="27" ry="16" fill="#2a1a05" />
      <path d="M38 44 Q40 30 52 26 Q60 22 68 26 Q80 30 82 44" fill="#2a1a05" />
      <path d="M34 52 Q32 60 34 68" stroke="#1a0a00" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M86 52 Q88 60 86 68" stroke="#1a0a00" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <path d="M40 63 Q49 59 57 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M63 63 Q71 59 80 63" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#312e81" />
      <circle cx="72" cy="70" r="4" fill="#312e81" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path d="M57 77 Q60 83 63 77" stroke="#a06030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q60 96 73 86" stroke="#7a3a10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M47 86 Q44 82 46 78" stroke="#b07040" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M73 86 Q76 82 74 78" stroke="#b07040" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// ─── Avatar registry — all available SVG personas ────────────────────────────
export const AVATAR_REGISTRY: Record<string, React.ComponentType> = {
  Aria: AvatarAria, Felix: AvatarFelix, Orion: AvatarOrion, Maya: AvatarMaya,
  Theo: AvatarTheo, Lex: AvatarLex, Hana: AvatarHana, Sage: AvatarSage,
  Marcus: AvatarMarcus, Donna: AvatarDonna, Ray: AvatarRay, Claire: AvatarClaire,
  Tony: AvatarTony, Priya: AvatarPriya, Rex: AvatarRex, Viper: AvatarViper,
  Chase: AvatarChase, Nova: AvatarNova, Pixel: AvatarPixel, Blaze: AvatarBlaze,
  Cleo: AvatarCleo, Patch: AvatarPatch, Ember: AvatarEmber, Iris: AvatarIris,
  Shield: AvatarShield, Buzz: AvatarBuzz,
};
