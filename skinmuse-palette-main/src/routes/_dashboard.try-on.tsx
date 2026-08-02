import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  Camera,
  Upload,
  ScanFace,
  Wand2,
  RotateCcw,
  Save,
  Share2,
  Download,
  Heart,
  ZoomIn,
  Sparkles,
} from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/try-on")({
  head: () => ({ meta: [{ title: "Virtual Try-On — SkinMuse" }] }),
  component: TryOn,
});

type ToolKey =
  | "Foundation"
  | "Lipstick"
  | "Blush"
  | "Eyeshadow"
  | "Eyeliner"
  | "Contour"
  | "Bronzer";

const TOOLS: { key: ToolKey; label: string; icon: string }[] = [
  { key: "Foundation", label: "Foundation", icon: "🧴" },
  { key: "Lipstick", label: "Lipstick", icon: "💄" },
  { key: "Blush", label: "Blush", icon: "🌸" },
  { key: "Eyeshadow", label: "Eyeshadow", icon: "🎨" },
  { key: "Eyeliner", label: "Eyeliner", icon: "✒️" },
  { key: "Contour", label: "Contour", icon: "🖌️" },
  { key: "Bronzer", label: "Bronzer", icon: "☀️" },
];

const SHADES: Record<ToolKey, { name: string; hex: string }[]> = {
  Foundation: [
    { name: "Ivory 1.5", hex: "#f2d5b5" },
    { name: "Beige 2.5", hex: "#e6bf99" },
    { name: "Warm 3.5", hex: "#d4a37a" },
    { name: "Almond 4.5", hex: "#b98460" },
  ],
  Lipstick: [
    { name: "Rose Petal", hex: "#d67d7d" },
    { name: "Nude Sand", hex: "#b8785e" },
    { name: "Deep Rouge", hex: "#8a1e2b" },
    { name: "Berry Muse", hex: "#7d2a44" },
  ],
  Blush: [
    { name: "Petal", hex: "#f2a3a0" },
    { name: "Peach", hex: "#f2b28b" },
    { name: "Berry", hex: "#c9615c" },
  ],
  Eyeshadow: [
    { name: "Champagne", hex: "#e8c78a" },
    { name: "Cocoa", hex: "#7d4a28" },
    { name: "Rose Dust", hex: "#c9877a" },
  ],
  Eyeliner: [
    { name: "Kohl Black", hex: "#111111" },
    { name: "Espresso", hex: "#3a2418" },
  ],
  Contour: [
    { name: "Soft", hex: "#a97957" },
    { name: "Deep", hex: "#5f3d24" },
  ],
  Bronzer: [
    { name: "Golden", hex: "#c48a5c" },
    { name: "Sunlit", hex: "#a66a3f" },
  ],
};

function TryOn() {
  const [source, setSource] = useState<"scan" | "upload" | "camera">("scan");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tool, setTool] = useState<ToolKey>("Lipstick");
  const [shadeIdx, setShadeIdx] = useState(0);
  const [opacity, setOpacity] = useState(70);
  const [zoom, setZoom] = useState(100);
  const [split, setSplit] = useState(50);
  const [applied, setApplied] = useState<Record<ToolKey, string>>({} as Record<ToolKey, string>);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentShade = SHADES[tool][shadeIdx];

  const overlays = useMemo(() => {
    const list = Object.entries(applied) as [ToolKey, string][];
    return list.map(([k, hex]) => ({ k, hex }));
  }, [applied]);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageUrl(URL.createObjectURL(f));
    setSource("upload");
  }

  function applyShade() {
    setApplied((prev) => ({ ...prev, [tool]: currentShade.hex }));
  }

  function reset() {
    setApplied({} as Record<ToolKey, string>);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Virtual Try-On"
        title="See it on you, in real time"
        description="Layer foundations, lipsticks and full looks with photorealistic AR overlays."
        actions={
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige"
          >
            <RotateCcw size={13} /> Reset
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <GlassCard className="!p-0 overflow-hidden">
          <div className="grid grid-cols-3 gap-2 border-b border-charcoal/5 bg-white/60 p-3">
            <SourceButton
              active={source === "scan"}
              onClick={() => {
                setSource("scan");
                setImageUrl(null);
              }}
              icon={<ScanFace size={14} />}
              label="Use Scan"
            />
            <SourceButton
              active={source === "upload"}
              onClick={() => inputRef.current?.click()}
              icon={<Upload size={14} />}
              label="Upload Selfie"
            />
            <SourceButton
              active={source === "camera"}
              onClick={() => setSource("camera")}
              icon={<Camera size={14} />}
              label="Open Camera"
            />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
            />
          </div>

          {/* Canvas */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-beige via-blush/40 to-rosegold/20">
            {/* Before/After split */}
            <div
              className="relative h-full w-full"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
            >
              <FacePlaceholder imageUrl={imageUrl} />
              {/* After side */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
              >
                <FacePlaceholder imageUrl={imageUrl} />
                {overlays.map((o) => (
                  <FeatureOverlay
                    key={o.k}
                    feature={o.k}
                    hex={o.hex}
                    opacity={o.k === tool ? opacity / 100 : 0.7}
                  />
                ))}
              </div>
              {/* Split handle */}
              <div
                className="pointer-events-none absolute top-0 h-full w-[2px] bg-white/80 shadow-luxe"
                style={{ left: `${split}%` }}
              />
              <div
                className="pointer-events-none absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-charcoal shadow-luxe"
                style={{ left: `${split}%` }}
              >
                <Wand2 size={14} />
              </div>
            </div>

            {/* Labels */}
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/70 backdrop-blur">
              Before
            </div>
            <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur">
              After
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-4 py-2 backdrop-blur">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
                Compare
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={split}
                onChange={(e) => setSplit(Number(e.target.value))}
                className="w-40 accent-rosegold"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/5 bg-white/60 p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(160, z + 10))}
                className="flex items-center gap-1 rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-[11px] text-charcoal hover:bg-beige"
              >
                <ZoomIn size={12} /> Zoom {zoom}%
              </button>
              <button
                onClick={() => setZoom(100)}
                className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-[11px] text-charcoal hover:bg-beige"
              >
                Fit
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ActionBtn icon={<Save size={12} />} label="Save Look" />
              <ActionBtn icon={<Heart size={12} />} label="Favorite" />
              <ActionBtn icon={<Share2 size={12} />} label="Share" />
              <ActionBtn icon={<Download size={12} />} label="Download" />
            </div>
          </div>
        </GlassCard>

        {/* Right controls */}
        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-serif text-lg text-charcoal">Products</h3>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {TOOLS.map((t) => {
                const active = tool === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => {
                      setTool(t.key);
                      setShadeIdx(0);
                    }}
                    className={`flex flex-col items-center gap-1 rounded-2xl border p-2.5 text-[10px] transition ${
                      active
                        ? "border-rosegold bg-rosegold/10 text-charcoal"
                        : "border-charcoal/10 bg-white/70 text-charcoal/60 hover:bg-beige"
                    }`}
                  >
                    <span className="text-base">{t.icon}</span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-serif text-lg text-charcoal">{tool} · Shade</h3>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {SHADES[tool].map((s, i) => {
                const active = shadeIdx === i;
                return (
                  <button
                    key={s.name}
                    onClick={() => setShadeIdx(i)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-2 transition ${
                      active ? "border-rosegold bg-rosegold/5" : "border-charcoal/10 bg-white/70"
                    }`}
                    title={s.name}
                  >
                    <span
                      className="block h-10 w-10 rounded-full ring-2 ring-white"
                      style={{ background: s.hex }}
                    />
                    <span className="line-clamp-1 text-[10px] text-charcoal/70">{s.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
                <span>Intensity</span>
                <span>{opacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-rosegold"
              />
            </div>
            <button
              onClick={applyShade}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-charcoal py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
            >
              <Wand2 size={13} /> Apply {currentShade.name}
            </button>
          </GlassCard>

          <GlassCard>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
              <Sparkles size={12} /> AI Pairings
            </p>
            <ul className="mt-3 space-y-3 text-sm text-charcoal/80">
              <Pairing name="Rare Beauty · Soft Pinch Blush" note="Pairs with your foundation" />
              <Pairing name="Charlotte Tilbury · Pillow Talk" note="Suggested lipstick" />
              <Pairing name="Huda Beauty · Rose Study" note="Matching eyeshadow" />
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-charcoal hover:bg-beige">
      {icon} {label}
    </button>
  );
}

function SourceButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-medium transition ${
        active ? "bg-charcoal text-ivory" : "bg-white/70 text-charcoal/70 hover:bg-beige"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function FacePlaceholder({ imageUrl }: { imageUrl: string | null }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="You"
        className="h-full w-full object-cover"
      />
    );
  }
  // Stylized SVG "face" as placeholder
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="skin" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f7ddc5" />
          <stop offset="100%" stopColor="#d9a985" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="#f7ecdd" />
      <ellipse cx="200" cy="260" rx="130" ry="170" fill="url(#skin)" />
      {/* eyes */}
      <ellipse cx="155" cy="240" rx="14" ry="6" fill="#3a2418" />
      <ellipse cx="245" cy="240" rx="14" ry="6" fill="#3a2418" />
      {/* brows */}
      <path d="M135 218 Q155 208 178 218" stroke="#4a3320" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M222 218 Q245 208 265 218" stroke="#4a3320" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* nose */}
      <path d="M200 250 Q195 300 200 320" stroke="#c99a7a" strokeWidth="3" fill="none" />
      {/* lips */}
      <path d="M170 355 Q200 340 230 355 Q200 380 170 355 Z" fill="#c95a5a" opacity="0.35" />
      {/* cheeks */}
      <ellipse cx="145" cy="310" rx="30" ry="20" fill="#e77b7b" opacity="0.15" />
      <ellipse cx="255" cy="310" rx="30" ry="20" fill="#e77b7b" opacity="0.15" />
    </svg>
  );
}

function FeatureOverlay({
  feature,
  hex,
  opacity,
}: {
  feature: ToolKey;
  hex: string;
  opacity: number;
}) {
  const style: React.CSSProperties = { pointerEvents: "none", mixBlendMode: "multiply" as const };
  const regions: Record<ToolKey, React.ReactNode> = {
    Foundation: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <ellipse cx="200" cy="260" rx="128" ry="168" fill={hex} opacity={opacity * 0.55} />
      </svg>
    ),
    Lipstick: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <path d="M170 355 Q200 340 230 355 Q200 383 170 355 Z" fill={hex} opacity={opacity} />
      </svg>
    ),
    Blush: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <ellipse cx="145" cy="310" rx="34" ry="24" fill={hex} opacity={opacity * 0.65} />
        <ellipse cx="255" cy="310" rx="34" ry="24" fill={hex} opacity={opacity * 0.65} />
      </svg>
    ),
    Eyeshadow: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <path d="M130 230 Q155 214 180 230 Q160 244 130 230 Z" fill={hex} opacity={opacity * 0.7} />
        <path d="M220 230 Q245 214 270 230 Q250 244 220 230 Z" fill={hex} opacity={opacity * 0.7} />
      </svg>
    ),
    Eyeliner: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <path d="M138 236 Q155 230 175 236" stroke={hex} strokeWidth="3" fill="none" opacity={opacity} strokeLinecap="round" />
        <path d="M225 236 Q245 230 262 236" stroke={hex} strokeWidth="3" fill="none" opacity={opacity} strokeLinecap="round" />
      </svg>
    ),
    Contour: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <path d="M110 290 Q130 350 160 380" stroke={hex} strokeWidth="30" fill="none" opacity={opacity * 0.35} strokeLinecap="round" />
        <path d="M290 290 Q270 350 240 380" stroke={hex} strokeWidth="30" fill="none" opacity={opacity * 0.35} strokeLinecap="round" />
      </svg>
    ),
    Bronzer: (
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={style}>
        <ellipse cx="200" cy="200" rx="90" ry="30" fill={hex} opacity={opacity * 0.3} />
        <ellipse cx="140" cy="300" rx="40" ry="30" fill={hex} opacity={opacity * 0.25} />
        <ellipse cx="260" cy="300" rx="40" ry="30" fill={hex} opacity={opacity * 0.25} />
      </svg>
    ),
  };
  return <div className="absolute inset-0 animate-fade-in">{regions[feature]}</div>;
}

function Pairing({ name, note }: { name: string; note: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-2xl border border-charcoal/5 bg-white/60 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-xs text-charcoal">{name}</p>
        <p className="text-[10px] text-charcoal/50">{note}</p>
      </div>
      <button className="rounded-full bg-charcoal px-3 py-1 text-[10px] font-medium text-ivory hover:bg-rosegold">
        Try
      </button>
    </li>
  );
}
