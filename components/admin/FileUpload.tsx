/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useRef, useState } from "react";

export default function FileUpload({
  onUploaded,
  label = "Upload image (png/jpg)",
  accept = "image/*",
  onUploadingChange,
}: {
  onUploaded: (path: string) => void;
  label?: string;
  accept?: string;
  onUploadingChange?: (v: boolean) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    onUploadingChange?.(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      setPreview(json.path);
      onUploaded(json.path);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
      onUploadingChange?.(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-white/70">{label}</label>
      <div className="mt-2 flex items-center gap-3">
        <input
          ref={ref}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="block w-full text-sm text-white/90 file:mr-3 file:rounded-md file:border-0
                     file:bg-white/10 file:px-3 file:py-2 file:text-white/90 hover:file:bg-white/20"
        />
        {loading && <span className="text-xs text-white/60">Uploading…</span>}
      </div>
      {preview && (
        <div className="mt-2">
          <Image
            src={preview}
            alt="preview"
            width={80}
            height={80}
            className="h-20 w-20 rounded-md object-cover"
          />
          <p className="text-[11px] text-white/60 break-all">{preview}</p>
        </div>
      )}
    </div>
  );
}
