"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { contactSchema } from "@/lib/validations/contact";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsPending(true);
    
    try {
      const result = await submitContactForm(data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 pt-24 pb-20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
            Get in touch
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have questions about WorkProof? Want to report an issue or explore partnership opportunities? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Email Us</p>
                    <a href="mailto:workproof19@gmail.com" className="text-neutral-500 hover:text-emerald-600 transition-colors">
                      workproof19@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Office</p>
                    <p className="text-neutral-500">
                      San Francisco, CA<br />
                      Remote-first company
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h4 className="font-medium text-emerald-900 mb-2">Support Hours</h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Our support team is available Monday through Friday, 9am to 5pm PT. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      {...register("name")} 
                      className="bg-neutral-50"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      {...register("email")} 
                      className="bg-neutral-50"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject (Optional)</Label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    {...register("subject")} 
                    className="bg-neutral-50"
                  />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    className="min-h-[150px] resize-none bg-neutral-50"
                    {...register("message")} 
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white" 
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
