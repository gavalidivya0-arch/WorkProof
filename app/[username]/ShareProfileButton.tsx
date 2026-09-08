"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";

interface ShareProfileButtonProps {
  username: string;
}

export function ShareProfileButton({ username }: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username}'s WorkProof Profile`,
          text: `Check out ${username}'s verified portfolio on WorkProof.`,
          url: url,
        });
        return;
      } catch (error) {
        // If user cancelled, just return. Otherwise fallback to copy.
        if ((error as Error).name === "AbortError") return;
      }
    }
    
    // Fallback
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) return null;

  return (
    <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : (typeof navigator.share === "function" ? <Share2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />)}
      {copied ? "Link Copied!" : "Share Profile"}
    </Button>
  );
}
