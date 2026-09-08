"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Copy, Check, Printer, Share2 } from "lucide-react";

interface VerificationClientProps {
  verificationId: string;
}

export function VerificationClient({ verificationId }: VerificationClientProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    // Ensure we don't accidentally generate a localhost QR in production
    // if NEXT_PUBLIC_APP_URL is correctly set.
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/verify/${verificationId}`;
    setUrl(fullUrl);
  }, [verificationId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Verified Project on WorkProof",
          text: `Check out this verified project on WorkProof. Verification ID: ${verificationId}`,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopy();
    }
  };

  if (!url) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-t pt-8 mt-12 print:hidden">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm border">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(url)}`}
            alt="QR Code for Verification Link"
            width={120}
            height={120}
          />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Scan to verify</p>
      </div>

      <div className="flex flex-col gap-3 w-full md:w-auto">
        <Button onClick={handleCopy} variant="outline" className="w-full md:w-48 flex items-center justify-center gap-2">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button onClick={handleShare} variant="outline" className="w-full md:w-48 flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Verification
        </Button>
        <Button onClick={handlePrint} className="w-full md:w-48 flex items-center justify-center gap-2">
          <Printer className="w-4 h-4" />
          Print Certificate
        </Button>
      </div>
    </div>
  );
}
