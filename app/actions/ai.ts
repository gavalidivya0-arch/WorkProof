"use server";

import { generateText, generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Helper to check if API key exists
const hasApiKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function enforceProPlan() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true }
  });
  
  if (user?.plan === "FREE") {
    throw new Error("AI features require a PRO or BUSINESS plan. Please upgrade to continue.");
  }
}

export async function enhanceProjectDescription(input: string) {
  if (!input || input.trim() === "") return { text: "" };

  try {
    await enforceProPlan();
  } catch (error: any) {
    return { error: error.message };
  }

  if (!hasApiKey) {
    // Mock response for testing without API key
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      text: `Developed a robust solution focusing on ${input.toLowerCase().includes("ecommerce") ? "e-commerce capabilities" : "core functionality"}. Implemented best practices for performance and responsiveness. ${input}`
    };
  }

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `You are a professional profile assistant for freelancers. 
Your job is to take a short, rough input describing a project and rewrite it into a polished, professional description.
CRITICAL RULES:
1. Do NOT invent or fabricate any details, metrics, dates, clients, or technologies that were not explicitly mentioned in the input.
2. Only rephrase and structure the provided information professionally.
3. Keep it concise (1-2 paragraphs).`,
      prompt: input,
    });

    return { text };
  } catch (error) {
    console.error("AI Enhance Error:", error);
    return { error: "Failed to enhance description." };
  }
}

export async function extractSkills(description: string) {
  if (!description || description.trim() === "") return { skills: [] };

  try {
    await enforceProPlan();
  } catch (error: any) {
    return { error: error.message };
  }

  if (!hasApiKey) {
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockSkills = [];
    const lower = description.toLowerCase();
    if (lower.includes("react")) mockSkills.push("React");
    if (lower.includes("next")) mockSkills.push("Next.js");
    if (lower.includes("stripe")) mockSkills.push("Stripe");
    if (lower.includes("api")) mockSkills.push("REST API");
    if (lower.includes("db") || lower.includes("postgres")) mockSkills.push("PostgreSQL");
    
    if (mockSkills.length === 0) mockSkills.push("Web Development", "Frontend");
    
    return { skills: mockSkills };
  }

  try {
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      system: `Extract a list of technical skills (e.g. React, Next.js, Stripe, PostgreSQL, UI/UX) from the provided text.
CRITICAL RULES:
1. Only extract skills that are explicitly mentioned or heavily implied by the text.
2. Return an array of strings. Maximum 10 skills.`,
      schema: z.object({
        skills: z.array(z.string()),
      }),
      prompt: description,
    });

    return { skills: object.skills };
  } catch (error) {
    console.error("AI Extract Error:", error);
    return { error: "Failed to extract skills." };
  }
}

export async function analyzeResume(resumeText: string) {
  if (!resumeText || resumeText.trim() === "") return { error: "No text provided" };

  try {
    await enforceProPlan();
  } catch (error: any) {
    return { error: error.message };
  }

  if (!hasApiKey) {
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      projectsMentioned: 3,
      potentiallyVerifiable: 2,
      missingInfo: ["Client verification", "Project duration", "Specific deliverables"],
    };
  }

  try {
    const { object } = await generateObject({
      model: google("gemini-1.5-pro"),
      system: `You are a resume analyzer for a platform called WorkProof. WorkProof requires freelancers to have their past clients explicitly verify their projects.
Analyze the provided resume and identify:
1. How many distinct projects are mentioned?
2. How many of those look like they were done for a client (potentially verifiable)?
3. What key verifiability information is missing from the resume generally? (e.g., "Client verification", "Project dates/duration", "Clear deliverables"). 
CRITICAL RULE: Never invent data. Base analysis strictly on the text.`,
      schema: z.object({
        projectsMentioned: z.number().describe("Total number of projects mentioned"),
        potentiallyVerifiable: z.number().describe("Number of projects that seem to have been done for an external client"),
        missingInfo: z.array(z.string()).describe("List of missing key verifiability elements (e.g., Client contact info, Exact dates)"),
      }),
      prompt: resumeText,
    });

    return object;
  } catch (error) {
    console.error("AI Analyze Error:", error);
    return { error: "Failed to analyze resume." };
  }
}
