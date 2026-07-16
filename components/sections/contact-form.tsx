'use client';

import { useState, useTransition } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Check } from 'lucide-react';

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    startTransition(async () => {
      const { error: insertError } = await supabase
        .from('contacts')
        .insert({ name, email, message });

      if (insertError) {
        setError('Something went wrong. Please try again.');
      } else {
        setSuccess(true);
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 p-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="h-6 w-6 text-emerald-500" />
        </div>
        <h3 className="mb-2 text-lg font-medium">Message sent</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Doe"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          required
          rows={5}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  );
}
