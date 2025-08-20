/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PortfolioChatbot.tsx
"use client";
import { useEffect, useState } from "react";

export default function PortfolioChatbot() {
  const [ChatBot, setChatBot] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamic import chatbot package
    import("@farhanmp/ai-chatbot-widget")
      .then((module) => {
        setChatBot(() => module.default);
      })
      .catch((error) => {
        console.error("Failed to load chatbot:", error);
      });

    // ✅ FORCE OVERRIDE dengan CSS yang BENAR
    const style = document.createElement("style");
    style.textContent = `
      /* Reset package CSS dan apply CSS yang benar */
      .chatbot-container {
        position: relative !important;
      }

      .chatbot-popup {
        position: fixed !important;
        opacity: 0 !important;
        pointer-events: none !important;
        bottom: 90px !important;
        right: 35px !important;
        overflow: hidden !important;
        transform: scale(0.2) !important;
        width: 380px !important;
        background-color: white !important;
        border-radius: 10px !important;
        box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 0 32px 0 rgba(0, 0, 0, 0.1) !important;
        transition: all 0.1s ease-in-out !important;
      }

      .containers.show-chatbot .chatbot-popup {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: scale(1) !important;
      }

      .chatbot-popup .chatbot-header {
        display: flex !important;
        align-items: center !important;
        background-color: #172554 !important;
        fill: #172554 !important;
        color: white !important;
        justify-content: space-between !important;
        padding: 10px 22px !important;
        border-bottom: 1px solid #e0e0e0 !important;
      }

      .chatbot-header .header-info {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
      }

      .header-info svg {
        flex-shrink: 0 !important;
        width: 25px !important;
        height: 25px !important;
        background-color: white !important;
        border-radius: 50% !important;
        padding: 2px !important;
      }

      .header-info .logo-text {
        font-size: 1.11rem !important;
        font-weight: 600 !important;
      }

      .chatbot-header button {
        display: flex !important;
        height: 30px !important;
        width: 30px !important;
        outline: none !important;
        border-radius: 50% !important;
        border: none !important;
        color: white !important;
        font-size: 1.5rem !important;
        padding-top: 2px !important;
        cursor: pointer !important;
        margin-right: -10px !important;
        transition: 0.4s ease-in-out !important;
        justify-content: center !important;
        align-items: center !important;
      }

      .chatbot-header button:hover {
        background-color: rgba(255, 255, 255, 0.132) !important;
      }

      .chatbot-body {
        padding: 20px 22px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 5px !important;
        height: 300px !important;
        margin-bottom: 82px !important;
        overflow-y: auto !important;
        scrollbar-width: thin !important;
        scrollbar-color: #172554 #f1f1f1 !important;
      }

      #toggle-chatbot {
        position: fixed !important;
        bottom: 30px !important;
        right: 35px !important;
        border: none !important;
        display: flex !important;
        height: 50px !important;
        width: 50px !important;
        align-items: center !important;
        justify-content: center !important;
        background-color: #172554 !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
      }

      .containers.show-chatbot #toggle-chatbot {
        transform: rotate(180deg) !important;
      }

      #toggle-chatbot span {
        position: absolute !important;
        color: white !important;
      }

      .chatbot-body::-webkit-scrollbar {
        width: 5px !important;
      }

      .chatbot-body::-webkit-scrollbar-track {
        background: #f1f1f1 !important;
      }

      .chatbot-body::-webkit-scrollbar-thumb {
        background: #172554 !important;
        border-radius: 10px !important;
      }

      .chatbot-body::-webkit-scrollbar-thumb:hover {
        background: #767a93 !important;
      }

      .chatbot-body .message {
        display: flex !important;
        align-items: center !important;
        gap: 11px !important;
      }

      .chatbot-body .bot-message svg {
        flex-shrink: 0 !important;
        width: 25px !important;
        height: 25px !important;
        padding: 4px !important;
        background-color: #172554 !important;
        fill: white !important;
        border-radius: 50% !important;
        margin-bottom: 2px !important;
        align-self: flex-end !important;
      }

      .chatbot-body .message .message-text {
        padding: 12px 16px !important;
        max-width: 75% !important;
        word-wrap: break-word !important;
        white-space: pre-line !important;
        font-size: 0.95rem !important;
      }

      .chatbot-body .user-message {
        flex-direction: column !important;
        align-items: flex-end !important;
      }

      .chatbot-body .bot-message .message-text {
        background-color: #6d7ff5 !important;
        color: white !important;
        border-radius: 15px 15px 15px 0px !important;
      }

      .chatbot-body .user-message .message-text {
        background-color: #172554 !important;
        color: white !important;
        border-radius: 15px 15px 0px 15px !important;
      }

      .chatbot-footer {
        position: absolute !important;
        width: 100% !important;
        bottom: 0 !important;
        background: white !important;
        padding: 15px 22px 20px !important;
      }

      .chatbot-footer .chatbot-form {
        border-radius: 32px !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        outline: 1px solid #161414 !important;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.06) !important;
      }

      .chatbot-footer .chatbot-form:focus-within {
        outline: 2px solid #172554 !important;
      }

      .chatbot-form .chatbot-input {
        border: none !important;
        outline: none !important;
        background: none !important;
        width: 100% !important;
        height: 47px !important;
        padding: 0 17px !important;
        font-size: 0.95rem !important;
        color: #172554 !important;
      }

      .chatbot-form button {
        width: 35px !important;
        height: 35px !important;
        border-radius: 50% !important;
        background-color: #172554 !important;
        color: white !important;
        border: none !important;
        cursor: pointer !important;
        display: none !important;
        flex-shrink: 0 !important;
        align-items: center !important;
        justify-content: center !important;
        outline: none !important;
        margin-right: 6px !important;
        transition: 0.4s ease-in-out !important;
      }

      .chatbot-form button:hover {
        background-color: #2c48ff !important;
      }

      .chatbot-form .chatbot-input:valid ~ button {
        display: flex !important;
      }

      /* Mobile responsiveness */
      @media (max-width: 520px) {
        #toggle-chatbot {
          right: 20px !important;
          bottom: 20px !important;
        }

        .chatbot-popup {
          right: 0 !important;
          bottom: 0 !important;
          height: 100% !important;
          border-radius: 0 !important;
          width: 100% !important;
        }

        .chatbot-popup .chatbot-header {
          padding: 12px 15px !important;
        }

        .chatbot-body {
          height: calc(90% - 55px) !important;
          padding: 25px 15px !important;
        }

        .chatbot-footer {
          padding: 10px 15px 15px !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (!mounted || !ChatBot) return null;

  return (
    <ChatBot
      geminiApiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""}
      botName="Mas Kasep"
      companyInfo={`Halo! Saya adalah asisten virtual untuk portfolio Farhan Maulana Pangestu.

🧑‍💻 **Tentang Farhan:**
- Frontend Developer & Student Universitas Alma Ata  
- Tech Stack: React, Next.js, Node.js, Laravel, Express.js, MongoDB
- Alumni Dicoding Indonesia & Kampus Merdeka

Silakan tanyakan apa yang ingin Anda ketahui! 😊
Introduction:
Halo! Saya adalah asisten virtual Farhan Maulana Pangestu. Berikut adalah ringkasan profil, keahlian, dan pengalaman beliau: Farhan adalah seorang fresh graduate dari program studi S1 Teknik Informatika di Universitas Alma Ata dengan IPK 3.67. Beliau memiliki minat dan bakat yang kuat dalam teknologi, khususnya di bidang Pengembangan Web. 
Selama masa studinya, Farhan aktif mengikuti program MSIB Batch 5 dari Kampus Merdeka di Dicoding Indonesia sebagai Front-End dan Back-End Developer. Beliau berkomitmen untuk terus mengembangkan inovasi teknologi yang relevan dan selalu bersemangat untuk meningkatkan keahliannya.


Berikut adalah rincian mengenai pengalaman dan keahlian yang dimiliki Farhan:

Pengalaman Front End Developer di PT Tech Academy International (Magang).
MSIB Batch 5 Studi Independen (Dicoding Indonesia): Fokus pada pengembangan web yang kompleks, meliputi Capabilitas, Semantic, Responsive, Security Web, Interface User, Restful API, dan Cloud Server AWS.
Pengurus Organisasi Daerah (KAPMI DIY): Menjabat sebagai pengurus selama 1 periode dan bertanggung jawab menyelesaikan amanat yang diberikan.
AICOMS Workshop on Mobile Applications: Mempelajari dasar-dasar pengembangan aplikasi mobile menggunakan Dart dan Flutter.


Proyek


Web Aplikasi WisataId: Proyek tim besar menggunakan JavaScript, ReactJs, ExpressJs, Restful API, dan token AWS.
Web Aplikasi Restaurant: Proyek dengan fokus pada fitur utama dan pengalaman pengguna yang baik, seperti responsive, capabilitas, RestFull API, dan InjectManifest.
Web Aplikasi Film: Proyek submisi menggunakan JavaScript, RestFull API, dan desain web yang responsif.
Form Diskusi: Proyek full-stack menggunakan PHP native.

Keahlian

Hardskills:
Bahasa Pemrograman: JavaScript, TypeScript, Python, PHP.
Framework & Library: ReactJs, Next.js, NodeJs, ExpressJs, Laravel.
Database: MongoDb, MongoAtlas.
Styling: TailwindCSS.
Lainnya: Git, AWS Cloud Computing, Microsoft Office.

Softskills:

Komunikasi 
Problem Solving 
Berpikir Kritis 
Kerja Sama Tim 
Manajemen Proyek 

Anda dapat melihat profil lengkap dan portofolio Farhan melalui tautan berikut:
LinkedIn: www.linkedin.com/in/farhanmaulanapangestu 
GitHub: https://github.com/fmpangestu 
WhatsApp: https://wa.me/6285864806651
Portofolio: https://farhndv.me`}
      primaryColor="#172554"
      headerColor="#172554"
      botMessageColor="#6d7ff5"
      userMessageColor="#172554"
      borderRadius="10px"
      width="380px"
    />
  );
}
