"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyzeResume } from "@/app/actions/ai";
import { Sparkles, Loader2, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      return toast.error("Please paste your resume text first.");
    }
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    const result = await analyzeResume(resumeText);
    
    setIsAnalyzing(false);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      setAnalysisResult(result);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          Resume Analyzer
        </h1>
        <p className="text-neutral-500 mt-2">
          Paste your resume below. Our AI will analyze your experience and identify which projects can be added to WorkProof for client verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paste Resume</CardTitle>
              <CardDescription>Paste the plain text of your resume here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Experience: 
Software Engineer at Acme Corp (2020-2023)
- Built an e-commerce platform using React..."
                className="min-h-[400px] mb-4"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !resumeText.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Analyze Experience</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {analysisResult ? (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong>Important:</strong> AI cannot automatically verify your projects. You must still manually add these projects and invite your clients to verify them to receive a WorkProof certificate.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-neutral-50 border-neutral-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-neutral-900 mb-1">{analysisResult.projectsMentioned}</div>
                    <div className="text-sm text-neutral-500">Projects Found</div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-indigo-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-indigo-700 mb-1">{analysisResult.potentiallyVerifiable}</div>
                    <div className="text-sm text-indigo-600 font-medium">Verifiable Projects</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3 border-b border-neutral-100">
                  <CardTitle className="text-base flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Missing Verifiability Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-neutral-600 mb-3">
                    To fully verify these projects on WorkProof, you will need to provide the following information that is currently missing from your resume:
                  </p>
                  <ul className="space-y-2">
                    {analysisResult.missingInfo?.map((info: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center bg-neutral-50/50">
              <Sparkles className="w-12 h-12 mb-4 text-neutral-300" />
              <h3 className="text-lg font-medium text-neutral-700 mb-1">Awaiting Resume</h3>
              <p className="text-sm">Paste your resume and click analyze to see how many projects you can verify on WorkProof.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
