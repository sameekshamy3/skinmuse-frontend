import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import {
  ScanFace,
  Sun,
  Glasses,
  Scissors,
  Smile,
  Eye,
  User,
  Focus,
  Camera,
  Upload,
  RefreshCcw,
  Zap,
  ZapOff,
  X,
  ArrowLeft,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import {
  ScanShell,
  PrimaryButton,
  GhostButton,
  StepIndicator,
  CheckRow,
} from "@/components/scan/scan-ui";

export const Route = createFileRoute("/_dashboard/scan")({
  head: () => ({
    meta: [
      { title: "AI Face Scan — SkinMuse" },
      { name: "description", content: "Studio-grade AI skin analysis." },
    ],
  }),
  component: ScanFlow,
});

type Step = "prepare" | "capture" | "preview" | "validate" | "uploading";

const STEPS: { id: Step; label: string }[] = [
  { id: "prepare", label: "Prepare" },
  { id: "capture", label: "Capture" },
  { id: "preview", label: "Review" },
  { id: "validate", label: "Validate" },
  { id: "uploading", label: "Analyze" },
];

const PREP_TIPS = [
  { icon: Sun, title: "Bright, natural light", desc: "Face a window or use soft white light." },
  { icon: Glasses, title: "Remove glasses & hats", desc: "Nothing covering your features." },
  { icon: Scissors, title: "Tie hair back", desc: "Keep the face and jawline visible." },
  { icon: Smile, title: "Neutral expression", desc: "Relax your face, lips softly closed." },
  { icon: Eye, title: "Look at the camera", desc: "Eyes forward, chin level." },
  { icon: User, title: "Only one face visible", desc: "No other people in frame." },
  { icon: Focus, title: "Stay inside the guide", desc: "Fit your face within the oval." },
];

function ScanFlow() {
  const [step, setStep] = useState<Step>("prepare");
  const [image, setImage] = useState<string | null>(null);
  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div>
      <StepIndicator steps={STEPS.map((s) => s.label)} current={stepIndex} />
      {step === "prepare" && <PrepareStep onNext={() => setStep("capture")} />}
      {step === "capture" && (
        <CaptureStep
          onBack={() => setStep("prepare")}
          onCaptured={(img) => {
            setImage(img);
            setStep("preview");
          }}
        />
      )}
      {step === "preview" && image && (
        <PreviewStep
          image={image}
          onRetake={() => {
            setImage(null);
            setStep("capture");
          }}
          onUse={() => setStep("validate")}
        />
      )}
      {step === "validate" && image && (
        <ValidateStep
          image={image}
          onRetake={() => {
            setImage(null);
            setStep("capture");
          }}
          onContinue={() => setStep("uploading")}
        />
      )}
      {step === "uploading" && image && <UploadingStep image={image} />}
    </div>
  );
}

/* ---------------- Prepare ---------------- */

function PrepareStep({ onNext }: { onNext: () => void }) {
  const navigate = useNavigate();
  return (
    <ScanShell
      eyebrow="Step 1 · Preparation"
      title="Prepare for Your Skin Analysis"
      description="For the most accurate recommendations, follow these simple tips. Your photo stays private."
      footer={
        <>
          <GhostButton onClick={() => navigate({ to: "/dashboard" })}>
            <ArrowLeft size={14} /> Back
          </GhostButton>
          <PrimaryButton onClick={onNext}>
            Continue <ArrowRight size={14} />
          </PrimaryButton>
        </>
      }
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PREP_TIPS.map((t) => {
          const Icon = t.icon;
          return (
            <li
              key={t.title}
              className="group flex items-start gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-xl transition-all hover:shadow-luxe"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-soft">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal">{t.title}</p>
                <p className="mt-0.5 text-xs text-charcoal/55">{t.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </ScanShell>
  );
}

/* ---------------- Capture ---------------- */

function CaptureStep({
  onBack,
  onCaptured,
}: {
  onBack: () => void;
  onCaptured: (img: string) => void;
}) {
  const [mode, setMode] = useState<"choose" | "camera" | "upload">("choose");

  if (mode === "choose") {
    return (
      <ScanShell
        eyebrow="Step 2 · Capture"
        title="Choose how to capture"
        description="Use your device camera for a live scan, or upload a recent well-lit photo."
        footer={
          <GhostButton onClick={onBack}>
            <ArrowLeft size={14} /> Back
          </GhostButton>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => setMode("camera")}
            className="group flex flex-col items-start gap-4 rounded-3xl border border-white/60 bg-white/60 p-6 text-left backdrop-blur-xl transition-all hover:shadow-luxe"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe">
              <Camera size={22} />
            </div>
            <div>
              <p className="font-serif text-xl text-charcoal">Scan using Camera</p>
              <p className="mt-1 text-sm text-charcoal/60">
                Real-time face guide with capture and flip controls.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-rosegold">
              Open camera <ArrowRight size={12} />
            </span>
          </button>

          <button
            onClick={() => setMode("upload")}
            className="group flex flex-col items-start gap-4 rounded-3xl border border-white/60 bg-white/60 p-6 text-left backdrop-blur-xl transition-all hover:shadow-luxe"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-charcoal to-charcoal/70 text-ivory shadow-luxe">
              <Upload size={22} />
            </div>
            <div>
              <p className="font-serif text-xl text-charcoal">Upload from Gallery</p>
              <p className="mt-1 text-sm text-charcoal/60">
                Accepts JPG, PNG, and HEIC up to 10MB.
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-rosegold">
              Choose photo <ArrowRight size={12} />
            </span>
          </button>
        </div>
      </ScanShell>
    );
  }

  if (mode === "camera") {
    return (
      <CameraCapture
        onCancel={() => setMode("choose")}
        onCaptured={onCaptured}
      />
    );
  }

  return <UploadCapture onCancel={() => setMode("choose")} onUploaded={onCaptured} />;
}

function CameraCapture({
  onCancel,
  onCaptured,
}: {
  onCancel: () => void;
  onCaptured: (img: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 1280 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setError(null);
      } catch (e) {
        setError(
          "We couldn't access your camera. Grant permission in your browser or upload a photo instead.",
        );
      }
    }
    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [facing]);

  const capture = () => {
    const video = videoRef.current;
    if (!video) return;
    const size = Math.min(video.videoWidth || 720, video.videoHeight || 720);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sx = ((video.videoWidth || size) - size) / 2;
    const sy = ((video.videoHeight || size) - size) / 2;
    if (facing === "user") {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
    onCaptured(canvas.toDataURL("image/jpeg", 0.92));
  };

  return (
    <ScanShell
      eyebrow="Step 2 · Camera"
      title="Center your face in the guide"
      description="Hold still, breathe, and tap capture when the frame feels right."
    >
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-charcoal/95 shadow-luxe">
        {flash && (
          <div className="pointer-events-none absolute inset-0 z-20 bg-white/60 mix-blend-screen" />
        )}
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-ivory/80">
            <Camera size={28} className="text-rosegold" />
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            className={`h-full w-full object-cover ${facing === "user" ? "-scale-x-100" : ""}`}
          />
        )}
        {/* Oval guide */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_58%_78%_at_50%_50%,transparent_60%,black_62%)] bg-charcoal/50" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-ivory/70 shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset]" />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-charcoal/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/85">
            Align face
          </p>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-md items-center justify-between gap-3">
        <button
          onClick={onCancel}
          className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
          aria-label="Cancel"
        >
          <X size={18} />
        </button>
        <button
          onClick={capture}
          disabled={!!error}
          className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Capture"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ivory/80">
            <Camera size={20} />
          </span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
            className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
            aria-label="Flip camera"
          >
            <RefreshCcw size={16} />
          </button>
          <button
            onClick={() => setFlash((f) => !f)}
            className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
            aria-label="Toggle flash"
            title="Screen flash"
          >
            {flash ? <Zap size={16} /> : <ZapOff size={16} />}
          </button>
        </div>
      </div>
    </ScanShell>
  );
}

function UploadCapture({
  onCancel,
  onUploaded,
}: {
  onCancel: () => void;
  onUploaded: (img: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    setError(null);
    const okTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif"];
    const nameOk = /\.(jpe?g|png|heic|heif)$/i.test(file.name);
    if (!okTypes.includes(file.type) && !nameOk) {
      setError("Please upload a JPG, PNG, or HEIC file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onUploaded(String(reader.result));
    reader.onerror = () => setError("We couldn't read that file. Try another photo.");
    reader.readAsDataURL(file);
    // TODO: replace with Cloudinary upload before sending to AI analysis.
  };

  return (
    <ScanShell
      eyebrow="Step 2 · Upload"
      title="Upload a well-lit photo"
      description="JPG, PNG or HEIC · up to 10MB. Front-facing photos work best."
      footer={
        <>
          <GhostButton onClick={onCancel}>
            <ArrowLeft size={14} /> Back
          </GhostButton>
          <PrimaryButton onClick={() => inputRef.current?.click()}>
            <Upload size={14} /> Choose file
          </PrimaryButton>
        </>
      }
    >
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
          dragOver
            ? "border-rosegold bg-blush/20"
            : "border-charcoal/15 bg-white/50 hover:bg-white/70"
        }`}
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe">
          <ImageIcon size={22} />
        </div>
        <p className="font-serif text-lg text-charcoal">Drag a photo here</p>
        <p className="text-xs text-charcoal/50">or click to browse your files</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </label>
      {error && (
        <p className="mt-4 rounded-2xl border border-rosegold/30 bg-blush/30 px-4 py-3 text-sm text-rosegold">
          {error}
        </p>
      )}
    </ScanShell>
  );
}

/* ---------------- Preview ---------------- */

function PreviewStep({
  image,
  onRetake,
  onUse,
}: {
  image: string;
  onRetake: () => void;
  onUse: () => void;
}) {
  return (
    <ScanShell
      eyebrow="Step 3 · Review"
      title="Looks good?"
      description="Make sure your face is centered, sharp, and well-lit. You can retake anytime."
      footer={
        <>
          <GhostButton onClick={onRetake}>
            <RefreshCcw size={14} /> Retake
          </GhostButton>
          <PrimaryButton onClick={onUse}>
            Use this photo <ArrowRight size={14} />
          </PrimaryButton>
        </>
      }
    >
      <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-luxe">
        <img src={image} alt="Captured preview" className="h-full w-full object-cover" />
      </div>
    </ScanShell>
  );
}

/* ---------------- Validate ---------------- */

const CHECKS: { key: string; label: string; hint: string }[] = [
  { key: "one_face", label: "One face detected", hint: "Only your face is in frame." },
  { key: "centered", label: "Face centered", hint: "Aligned inside the oval guide." },
  { key: "lighting", label: "Good lighting", hint: "Soft, even light across the face." },
  { key: "visible", label: "Face visible", hint: "Nothing covering key features." },
  { key: "sharp", label: "Image not blurry", hint: "Sharp focus on skin details." },
  { key: "eyes", label: "Eyes visible", hint: "Eyes open, looking at the camera." },
  { key: "no_sunglasses", label: "No sunglasses", hint: "Remove any tinted eyewear." },
  { key: "no_mask", label: "No mask", hint: "Lower half of the face is visible." },
];

function ValidateStep({
  image,
  onRetake,
  onContinue,
}: {
  image: string;
  onRetake: () => void;
  onContinue: () => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [running, setRunning] = useState(true);

  useEffect(() => {
    // TODO: replace with real client-side face detection (e.g. MediaPipe / face-api.js).
    setChecked({});
    setRunning(true);
    let i = 0;
    const timer = setInterval(() => {
      const key = CHECKS[i]?.key;
      if (!key) {
        clearInterval(timer);
        setRunning(false);
        return;
      }
      setChecked((prev) => ({ ...prev, [key]: true }));
      i += 1;
    }, 260);
    return () => clearInterval(timer);
  }, [image]);

  const allPass = CHECKS.every((c) => checked[c.key]);

  return (
    <ScanShell
      eyebrow="Step 4 · Validation"
      title="Checking your photo"
      description="A quick quality pass so your analysis is as accurate as possible."
      footer={
        <>
          <GhostButton onClick={onRetake}>
            <RefreshCcw size={14} /> Retake photo
          </GhostButton>
          <PrimaryButton onClick={onContinue} disabled={running || !allPass}>
            Continue <ArrowRight size={14} />
          </PrimaryButton>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
        <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-luxe">
          <img src={image} alt="Photo to validate" className="h-full w-full object-cover" />
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CHECKS.map((c) => (
            <CheckRow
              key={c.key}
              label={c.label}
              hint={c.hint}
              ok={!!checked[c.key]}
              pending={!checked[c.key]}
            />
          ))}
        </ul>
      </div>
    </ScanShell>
  );
}

/* ---------------- Uploading ---------------- */

const UPLOAD_STEPS = [
  "Detecting face…",
  "Checking image quality…",
  "Preparing scan…",
  "Uploading image…",
];

function UploadingStep({ image }: { image: string }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function processScan() {
      try {
        setStepIdx(0);
        setProgress(10);
        
        // Convert base64 to blob
        const res = await fetch(image);
        const blob = await res.blob();
        
        setStepIdx(1);
        setProgress(30);
        
        const formData = new FormData();
        formData.append("image", blob, "scan.jpg");
        
        setStepIdx(2);
        setProgress(50);
        
        const data = await api.post("/scan", formData);
        
        if (!active) return;
        setStepIdx(3);
        setProgress(100);
        setTimeout(() => { window.location.href = "/scan/results"; }, 1000);
      } catch (err: any) {
        if (!active) return;
        setError(err.message || "Failed to process scan");
      }
    }
    processScan();
    return () => { active = false; };
  }, [image, navigate]);

  return (
    <ScanShell
      eyebrow="Step 5 · Analysis"
      title="Preparing your analysis"
      description="Our AI is reviewing tone, undertone, and texture. This only takes a moment."
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="relative grid h-28 w-28 place-items-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-rosegold/20" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rosegold to-blush shadow-luxe" />
          <ScanFace size={36} className="relative z-10 text-ivory" />
        </div>

        <p className="mt-8 font-serif text-2xl text-charcoal">
          {UPLOAD_STEPS[stepIdx]}
        </p>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-beige">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rosegold to-blush transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-charcoal/50">
          {Math.round(progress)}%
        </p>

        <ul className="mt-8 grid w-full grid-cols-1 gap-2 text-left">
          {UPLOAD_STEPS.map((label, i) => (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm backdrop-blur-xl ${
                i <= stepIdx ? "text-charcoal" : "text-charcoal/40"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
                  i < stepIdx
                    ? "bg-charcoal text-ivory"
                    : i === stepIdx
                      ? "bg-rosegold text-ivory"
                      : "bg-beige text-charcoal/40"
                }`}
              >
                {i + 1}
              </span>
              {label}
            </li>
          ))}
        </ul>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </ScanShell>
  );
}
