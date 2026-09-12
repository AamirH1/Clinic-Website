"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, faqs, treatments } from "@/lib/data";
import { ArrowBackIcon, ChatIcon, CloseIcon, SendIcon, TrashIcon, CalendarIcon } from "./icons";
import DatePicker from "./ui/DatePicker";

type Message = {
  id: string;
  from: "bot" | "user";
};

type ChatMessage = Message & { text: string };

type Mode = "menu" | "ask" | "book";

type BookingStep = "name" | "phone" | "email" | "treatment" | "date";

const bookingSteps: { key: BookingStep; prompt: string }[] = [
  { key: "name", prompt: "Great — let's get you booked in. What's your full name?" },
  { key: "phone", prompt: "Thanks! What's the best phone number to reach you on?" },
  { key: "email", prompt: "And your email address?" },
  { key: "treatment", prompt: "Which treatment are you interested in? Pick one below, or type your own." },
  { key: "date", prompt: "What date works best for you?" }
];

const NAME_RE = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(key: BookingStep, value: string): string | null {
  if (key === "name" && !NAME_RE.test(value.trim())) {
    return "That doesn't look like a full name — letters only, please.";
  }
  if (key === "phone") {
    const digits = value.replace(/\D/g, "");
    if (!PHONE_RE.test(value.trim()) || digits.length < 7) {
      return "That doesn't look like a valid phone number — please include at least 7 digits.";
    }
  }
  if (key === "email" && !EMAIL_RE.test(value.trim())) {
    return "That doesn't look like a valid email — could you double check it?";
  }
  if (key === "date") {
    const chosen = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime()) || chosen < today) {
      return "Please pick today or a future date.";
    }
  }
  return null;
}

function matchFaq(question: string) {
  const q = question.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const faq of faqs) {
    const words = faq.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const score = words.filter((w) => q.includes(w)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: faq.answer };
    }
  }
  return best?.answer ?? null;
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

const GREETING = "Hi, I'm the Harborlight assistant. Would you like to ask a question or book an appointment?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [bookingStepIndex, setBookingStepIndex] = useState(0);
  const [bookingData, setBookingData] = useState<Record<string, string>>({});
  const [bookingDone, setBookingDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("harborlight:open-chat", handleOpen);
    return () => window.removeEventListener("harborlight:open-chat", handleOpen);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      addMessage("bot", GREETING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open && (mode === "ask" || (mode === "book" && !bookingDone))) {
      inputRef.current?.focus();
    }
  }, [open, mode, bookingStepIndex, bookingDone]);

  function addMessage(from: ChatMessage["from"], text: string) {
    setMessages((prev) => [...prev, { id: nextId(), from, text }]);
  }

  function botReply(text: string, delay = 450) {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      addMessage("bot", text);
    }, delay);
  }

  function startMode(next: Mode) {
    setMode(next);
    if (next === "ask") {
      addMessage("bot", "Ask me anything about the clinic — hours, location, treatments, pricing.");
    }
    if (next === "book") {
      setBookingStepIndex(0);
      setBookingData({});
      setBookingDone(false);
      addMessage("bot", bookingSteps[0].prompt);
    }
  }

  function resetToMenu() {
    setMode("menu");
  }

  function clearChat() {
    setMessages([]);
    setMode("menu");
    setInput("");
    setBookingStepIndex(0);
    setBookingData({});
    setBookingDone(false);
    setTyping(false);
    window.setTimeout(() => addMessage("bot", GREETING), 50);
  }

  function handleAskSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;
    addMessage("user", question);
    setInput("");
    const answer = matchFaq(question);
    botReply(
      answer ??
        `I don't have an exact answer for that yet — please call us at ${brand.phone} and we'll help directly.`
    );
  }

  async function submitBooking(data: Record<string, string>) {
    setTyping(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          treatment: data.treatment,
          preferredDate: data.date
        })
      });
      setTyping(false);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        addMessage("bot", body.error || "Something went wrong submitting that — please try again or call us.");
        setBookingDone(true);
        return;
      }
      addMessage(
        "bot",
        `Thanks, ${data.name.trim().split(" ")[0]}! Your appointment request for ${data.treatment} on ${formatDate(
          data.date
        )} has been sent. We'll confirm by phone or email shortly.`
      );
      setBookingDone(true);
    } catch {
      setTyping(false);
      addMessage("bot", "Something went wrong submitting that — please try again or call us.");
      setBookingDone(true);
    }
  }

  function formatDate(iso: string) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  }

  function advanceBooking(value: string) {
    const step = bookingSteps[bookingStepIndex];
    const error = validateStep(step.key, value);
    if (error) {
      addMessage("user", value);
      setInput("");
      botReply(error);
      return;
    }

    addMessage("user", step.key === "date" ? formatDate(value) : value);
    setInput("");
    const updated = { ...bookingData, [step.key]: value };
    setBookingData(updated);

    const nextIndex = bookingStepIndex + 1;
    if (nextIndex < bookingSteps.length) {
      setBookingStepIndex(nextIndex);
      botReply(bookingSteps[nextIndex].prompt);
    } else {
      submitBooking(updated);
    }
  }

  function handleBookingSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    advanceBooking(value);
  }

  const currentStep = bookingSteps[bookingStepIndex];
  const isBookingActive = mode === "book" && !bookingDone;

  return (
    <div className="fixed bottom-5 right-5 z-50 lg:bottom-8 lg:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[min(600px,72vh)] w-[min(380px,90vw)] flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 bg-charcoal px-5 py-4 text-ivory">
              <div>
                <p className="font-serif text-lg leading-none">{brand.shortName}</p>
                <p className="mt-1 text-xs text-ivory/60">Usually replies within a few minutes</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  aria-label="Clear chat"
                  onClick={clearChat}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
                >
                  <TrashIcon />
                </button>
                <button
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.from === "user" ? "bg-charcoal text-ivory" : "bg-ivory2 text-charcoal/80"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-ivory2 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-charcoal/40"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {mode === "menu" && !typing && (
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => startMode("ask")}
                    className="flex items-center gap-2.5 rounded-full border border-charcoal/20 px-4 py-2.5 text-left text-sm text-charcoal transition-colors hover:border-charcoal"
                  >
                    <ChatIcon className="h-4 w-4 shrink-0" />
                    Ask a question
                  </button>
                  <button
                    onClick={() => startMode("book")}
                    className="flex items-center gap-2.5 rounded-full bg-charcoal px-4 py-2.5 text-left text-sm text-ivory transition-colors hover:bg-clinicalDeep"
                  >
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    Book an appointment
                  </button>
                </div>
              )}

              {isBookingActive && currentStep.key === "treatment" && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => advanceBooking(t.name)}
                      className="rounded-full border border-charcoal/20 px-3 py-1.5 text-xs text-charcoal/80 transition-colors hover:border-charcoal hover:bg-ivory2"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}

              {mode === "book" && bookingDone && (
                <button
                  onClick={resetToMenu}
                  className="mt-1 text-xs text-charcoal/60 underline underline-offset-4 hover:text-charcoal"
                >
                  Back to menu
                </button>
              )}
            </div>

            {mode === "ask" && (
              <form onSubmit={handleAskSubmit} className="flex gap-2 border-t border-charcoal/10 p-3">
                <button
                  type="button"
                  onClick={resetToMenu}
                  aria-label="Back to menu"
                  className="flex shrink-0 items-center justify-center rounded-full border border-charcoal/15 px-3 text-charcoal/60 hover:border-charcoal/40"
                >
                  <ArrowBackIcon />
                </button>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-full border border-charcoal/20 bg-ivory px-4 py-2 text-sm outline-none focus:border-charcoal"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="flex shrink-0 items-center justify-center rounded-full bg-charcoal px-4 text-ivory hover:bg-clinicalDeep"
                >
                  <SendIcon />
                </button>
              </form>
            )}

            {isBookingActive && !typing && currentStep.key !== "treatment" && (
              <form onSubmit={handleBookingSubmit} className="flex gap-2 border-t border-charcoal/10 p-3">
                <button
                  type="button"
                  onClick={resetToMenu}
                  aria-label="Back to menu"
                  className="flex shrink-0 items-center justify-center rounded-full border border-charcoal/15 px-3 text-charcoal/60 hover:border-charcoal/40"
                >
                  <ArrowBackIcon />
                </button>
                {currentStep.key === "date" ? (
                  <DatePicker value={input} onChange={(v) => advanceBooking(v)} />
                ) : (
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type={currentStep.key === "email" ? "email" : currentStep.key === "phone" ? "tel" : "text"}
                    placeholder="Type your answer..."
                    className="flex-1 rounded-full border border-charcoal/20 bg-ivory px-4 py-2 text-sm outline-none focus:border-charcoal"
                  />
                )}
                {currentStep.key !== "date" && (
                  <button
                    type="submit"
                    aria-label="Send"
                    className="flex shrink-0 items-center justify-center rounded-full bg-charcoal px-4 text-ivory hover:bg-clinicalDeep"
                  >
                    <SendIcon />
                  </button>
                )}
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-ivory shadow-xl transition-transform duration-300 hover:scale-105"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}

export function openChat() {
  window.dispatchEvent(new CustomEvent("harborlight:open-chat"));
}
