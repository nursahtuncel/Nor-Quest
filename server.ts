import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Lazy-initialize Gemini SDK to avoid crashes if the key is missing
let ai: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
}

// Full-stack API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, studentName, surahName, mode } = req.body;

    if (!prompt) {
       res.status(400).json({ error: "Prompt is required" });
       return;
    }

    const client = getGeminiClient();

    if (!client) {
      // Fallback response generator if API key is not configured yet
      console.log("Gemini API key not configured or is placeholder. Using smart educational fallback generator.");
      const fallbackResponse = getEducationalFallback(prompt, studentName, surahName, mode);
       res.json({ text: fallbackResponse });
       return;
    }

    // Build context-rich prompt for kids' Islamic tutor (Turkish enforced)
    let systemInstruction = "Sen, 5-12 yaş arası çocuklar için sıcak, destekleyici ve yaratıcı bir din eğitimi ve Kuran öğretmeni yardımcısısın. Dilin mutlaka TÜRKÇE olmalıdır. Tonunu teşvik edici, masalsı, basitleştirilmiş ve saygılı tut. Kolay okunması için madde işaretleri ve kalın başlıklar içeren biçimlendirmeler kullan.";
    if (mode === "story") {
      systemInstruction += " Kuran'dan hikayeleri çocuklar için büyüleyici ve anlaşılır bir şekilde anlatmakta uzmansın. Dost canlısı emojiler kullanarak ahlaki derslere ve empatiye odaklan.";
    } else if (mode === "assignment-tips") {
      systemInstruction += " Öğretmenlere, öğrenciler için sıcak, pratik ve özel Tecvid veya ezber tavsiyeleri sunarsın. Çocuk dostu egzersizlerle tam olarak neye çalışacaklarını açıklarsın.";
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Hatası:", error);
    res.status(500).json({ error: error.message || "Bir şeyler ters gitti" });
  }
});

// A fun fallback generator so that the application is fully functional offline/in dev without key (Turkish)
function getEducationalFallback(prompt: string, studentName?: string, surahName?: string, mode?: string): string {
  const normPrompt = prompt.toLowerCase();
  
  if (mode === "story" || normPrompt.includes("story") || normPrompt.includes("prophet") || normPrompt.includes("hikaye") || normPrompt.includes("peygamber")) {
    return `### 🐳 Yunus Peygamber ve Dev Balina'nın Hikayesi
 
 Bir zamanlar, Allah Yunus Peygamber'i Ninova halkına iyi işler yapmayı öğretmesi için göndermişti. Ancak insanlar hemen dinlemeyince, Yunus Peygamber biraz sabırsızlandı ve bir gemiye binip oradan ayrıldı.
 
 Birdenbire denizde devasa bir fırtına koptu! Gemiyi kurtarmak için Yunus Peygamber kendisini dalgaların arasına bıraktı. Masmavi denizin derinliklerine doğru süzüldü.
 
 Allah, **sevimli ve kocaman bir balinaya** Yunus'u yutmasını emretti; ona zarar vermek için değil, onu korumak için! Balinanın o karanlık ve sessiz karnında Yunus Peygamber daha sabırlı olması gerektiğini anladı. Çok içten ve samimi bir dua etti:
 
 > "La ilahe illa Ente, Sübhaneke, inni küntü minez-zalimin."
 > *(Senden başka ilah yoktur. Seni tenzih ederim. Gerçekten ben zalimlerden oldum.)*
 
 Allah onun bu samimi duasını hemen işitti! Balina kuyruğunu usulca sallayarak Yunus'u sıcacık, kumsal bir kıyıya bıraktı. Ninova halkı da onu neşeyle karşıladı, hep birlikte güzel kararlar alarak mutlu mesut yaşadılar.
 
 **🌟 Çocuklar İçin Dersler:**
 *   **Sabır:** Güzel şeyler zaman alır, bu yüzden hemen pes etme!
 *   **Samimi Dua:** En sessiz ve en karanlık yerlerde bile olsan daima Allah'tan yardım iste. O bizi her zaman dinler!`;
  }

  if (mode === "assignment-tips" || normPrompt.includes("tajweed") || normPrompt.includes("tecvid") || normPrompt.includes("ezber") || normPrompt.includes("pratik")) {
    const student = studentName || "öğrenciniz";
    const surah = surahName || "İhlas Suresi";
    return `### 🌟 ${student} için Özel Tecvid ve Ezber Tavsiyeleri 📖
 
 İşte **${student}** adlı öğrencimizin **${surah}** suresini en güzel şekilde öğrenmesi için adım adım hazırlanan destekleyici bir rehber:
 
 1.  **🔍 Kalkale (Yankı / Çarpma Sesi) Bulma:**
     *   **${surah}** içinde, *Ehad* ve *Samed* gibi kelimelerin sonundaki **Dal (د)** harfine dikkat çekin.
     *   **Eğlenceli Egzersiz:** "d" sesini çıkarırken ${student} ellerini çırpsın, sanki zıplayan bir top gibi! Sesi hafifçe zıplatmasını isteyin.
 2.  **🗣️ Ayn (ع) Harfinin Çıkış Yeri:**
     *   Boğaz harflerini çıkarırken dikkatli olmasını sağlayın, özellikle Fatiha suresinde *Na'budu* kelimesindeki Ayn harfi üzerinde durun.
     *   **Eğlenceli Egzersiz:** Boğazın ortasında hafif ve yumuşak bir mırıldanma yaparak "boğaz yankısı oyunu" oynayın.
 3.  **🏆 Süreci Eğlenceli Kılma:**
     *   ${student} günde sadece 2 dakikalık pratikle 5 günü tamamlarsa ona 3 yıldızlı çıkartma verin!
     *   Ses tonundaki yumuşaklığı övün! Hızlı okumasından ziyade doğru ve akıcı akışa odaklanın.`;
  }

  return `### 🌸 Noor Quest Yapay Zeka Yardımcısı! ✨
 
 Noor Quest öğrenim merkezine hoş geldiniz! Ben sizin dijital eğitim yoldaşınızım.
 
 Bugün size nasıl yardımcı olabilirim?
 *   Çocuklar için **bir Kuran hikayesi anlatabilirim** (Örn: "Nuh'un Gemisi hikayesini anlat")
 *   Bir sure için **etkileşimli bilgi yarışması soruları hazırlayabilirim**
 *   Tecvid kuralları için **özel ders notları oluşturabilirim**
 
 *İpucu: Gerçek zamanlı ve tamamen size özel yanıtlar almak için AI Studio Secrets panelinden geçerli bir Gemini API Anahtarı ekleyebilirsiniz!*`;
}

// Vite middleware for development / static files for production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
