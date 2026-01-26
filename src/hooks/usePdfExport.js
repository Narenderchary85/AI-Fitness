import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

export const useSimplePdfExport = () => {
  const exportToPdf = async (element, filename = "AI-Fitness.pdf") => {
    try {
      const dataUrl = await domtoimage.toPng(element, {
        quality: 1,
        bgcolor: "#ffffff",
        cacheBust: true,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          backgroundColor: "#ffffff",
          height: element.scrollHeight,
        },
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const ratio = pdfWidth / img.width;
      const imgWidth = pdfWidth;
      const imgHeight = img.height * ratio;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        while (heightLeft > 0) {
            pdf.addPage();
            position = heightLeft - imgHeight;
            pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        pdf.save(filename);

      console.log("PDF generated successfully!");
      return true;
    } catch (error) {
      console.error("PDF generation error:", error);
      return false;
    }
  };

  return { exportToPdf };
};

export const useTTS = () => {
    const [loadingTTS, setLoadingTTS] = useState(false);
  const audioRef = useRef(null);
    const speak = async (text) => {
      try {
        setLoadingTTS(true);
        const res = await fetch("https://ai-fitness-b.onrender.com/plan/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
  
        const data = await res.json();
  
        if (!data.success) {
          console.error("TTS failed:", data.message);
          return;
        }
  
        // Convert base64 to audio
        const audioBase64 = data.audio_base64;
        const audioSrc = `data:audio/wav;base64,${audioBase64}`;
  
        const audio = new Audio(audioSrc);
        audio.play();
  
      } catch (err) {
        console.error("TTS Error:", err);
      } finally{
        setLoadingTTS(false);
      }
    };

    const stop = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
  
    return { speak , stop , loadingTTS};
  };
  