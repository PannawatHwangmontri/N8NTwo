"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState(""); // เก็บเสียงที่พูด
  const [answer, setAnswer] = useState(""); // เก็บคำตอบจาก n8n
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ข้อมูลสินค้าจำลองสำหรับส่งไปให้ n8n ประมวลผล (หรือดึงจาก Database ของคุณ)
  const products = [
    { name: "SSD Samsung 980 500GB", price: 1550, stock: 10, category: "ssd" },
    { name: "Logitech G Pro Mouse", price: 3200, stock: 5, category: "mouse" },
    { name: "Mechanical Keyboard RGB", price: 2100, stock: 0, category: "keyboard" },
    { name: "RAM Corsair 16GB", price: 2400, stock: 8, category: "ram" }
  ];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "th-TH";
      recognition.continuous = false; // หยุดฟังเมื่อพูดจบหนึ่งประโยคเพื่อส่งข้อมูล
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            handleVoiceCommand(transcript);
          }
        }
        setText(transcript);
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceCommand = async (transcript: string) => {
    setIsLoading(true);
    try {
      // เชื่อมต่อกับ n8n Webhook ตาม path "it-shop-voice" ใน JSON
      const response = await fetch("https://YOUR_N8N_DOMAIN/webhook/it-shop-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: transcript,
          products: products // ส่ง list สินค้าไปให้ Code Node ใน n8n เช็ค
        }),
      });

      const data = await response.json();
      // รับค่า answer ที่ n8n สร้างขึ้น (เช่น "พบสินค้าที่ใกล้เคียง...")
      setAnswer(data.answer); 
    } catch (error) {
      console.error("Error:", error);
      setAnswer("ไม่สามารถเชื่อมต่อกับระบบจัดการสินค้าได้");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setAnswer("");
      setText("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl flex flex-col items-center bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl">
        <Image className="dark:invert mb-6" src="/next.svg" alt="Logo" width={100} height={20} />
        
        <h1 className="text-2xl font-bold mb-8 text-black dark:text-white">Voice IT Shop</h1>

        {/* ส่วนแสดงข้อความที่กำลังพูด */}
        <div className="w-full p-4 mb-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg min-h-[60px]">
          <p className="text-zinc-500 text-sm mb-1">สิ่งที่คุณพูด:</p>
          <p className="text-lg font-medium">{text || "..."}</p>
        </div>

        {/* ส่วนแสดงคำตอบจาก n8n */}
        <div className={`w-full p-6 mb-8 rounded-xl border-2 transition-all ${answer ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-zinc-200 dark:border-zinc-700'}`}>
          <p className="text-zinc-500 text-sm mb-2">คำตอบจากระบบ:</p>
          {isLoading ? (
            <div className="animate-pulse flex space-x-2"><div className="h-2 w-2 bg-zinc-400 rounded-full"></div><div className="h-2 w-2 bg-zinc-400 rounded-full"></div></div>
          ) : (
            <p className="text-lg whitespace-pre-line font-semibold text-zinc-800 dark:text-zinc-200">
              {answer || "รอฟังคำสั่งซื้อสินค้าของคุณ..."}
            </p>
          )}
        </div>

        <button
          onClick={toggleListening}
          className={`h-20 w-20 flex items-center justify-center rounded-full transition-all shadow-lg ${
            isListening ? "bg-red-500 animate-pulse scale-110" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isListening ? "●" : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>}
        </button>
        <p className="mt-4 text-sm font-medium text-zinc-500">
          {isListening ? "กำลังฟัง..." : "กดปุ่มเพื่อสอบถามสินค้า (เช่น SSD, RAM)"}
        </p>
      </main>
    </div>
  );
}