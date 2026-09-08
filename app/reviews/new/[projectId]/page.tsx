"use client";

import { useState, use } from "react";
import { submitReview } from "@/app/actions/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function StarRating({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-neutral-700 font-semibold">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition-transform focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= value ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientEmail: "",
    rating: 0,
    communication: 0,
    quality: 0,
    reliability: 0,
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientEmail) return toast.error("Please enter your email to verify identity.");
    if (!formData.rating || !formData.communication || !formData.quality || !formData.reliability) {
      return toast.error("Please provide ratings for all fields.");
    }

    setLoading(true);
    const res = await submitReview({ ...formData, projectId });
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Review submitted successfully!");
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Thank You!</h1>
          <p className="text-neutral-500">Your review has been successfully submitted and verified. This helps freelancers build their Trust Score.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-8 text-white relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-8 h-8 text-emerald-200" />
                <h1 className="text-2xl font-bold">Verified Client Review</h1>
              </div>
              <p className="text-emerald-100/80">
                You are submitting a review for a verified project.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-3">
              <Label htmlFor="clientEmail" className="text-neutral-700 font-semibold">Verify Identity</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="Enter the email you used to verify the project"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
              <StarRating
                label="Overall Rating"
                value={formData.rating}
                onChange={(v) => setFormData({ ...formData, rating: v })}
              />
              <StarRating
                label="Communication"
                value={formData.communication}
                onChange={(v) => setFormData({ ...formData, communication: v })}
              />
              <StarRating
                label="Work Quality"
                value={formData.quality}
                onChange={(v) => setFormData({ ...formData, quality: v })}
              />
              <StarRating
                label="Reliability"
                value={formData.reliability}
                onChange={(v) => setFormData({ ...formData, reliability: v })}
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <Label htmlFor="comment" className="text-neutral-700 font-semibold">Additional Comments (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience working with this freelancer..."
                className="resize-none h-32"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Verified Review"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
