import React, { useEffect, useState } from "react";

const App = () => {
  const data = [
    {
      image:
        "/public/IMG_20230430_232214 (1).jpg",
      text: "What if I'm becoming your man/partner",
    },
    {
      image:
        "/public/IMG_20221001_015417.jpg",
      text: "Main hamesha tumhara saath dunga. Tumhare saare problems solve karunga... ya phir tumhare saath baitha rahunga jab tak wo khatam na ho jaye. 😅",
    },
    {
      image:
        "/public/file_00000000fe0c51f69f404a516d56a8e5_conversation_id=67e9893f-45c8-800a-89fb-3b6a843ef449&message_id=5573643b-055d-4ae8-bd1b-c6b86b18d3f4.PNG",
      text: "Agar tujhe lagta hai ki me tere future ke bich me aunga.... Toh nhi me tera humesa sabse bada supporter rahunga. ",
    },
    {
      image:
        "/public/file_00000000b85851f6bda871dabc610258_conversation_id=67e9893f-45c8-800a-89fb-3b6a843ef449&message_id=4515ad2d-1e6d-4ac7-975f-bfdfb0443787.webp",
      text: "Me tujhe humesa khush rahkunga... Tum meri humesa priorty rehgi",
    },
    {
      image:
        "/public/ChatGPT Image Mar 31, 2025, 12_22_35 AM.png",
      text: "Main nahi chahta ki hum perfect hoon… sirf yeh chahta hoon ki hum hamesha saath hoon.",
    },
    {
      image:
        "/public/ChatGPT Image Apr 1, 2025, 12_50_05 AM.png",
      text: "Tumhara saath meri life ka sabse bada blessing hai",
    },
    {
      image:
        "/public/ChatGPT Image Apr 1, 2025, 01_02_48 AM.png",
      text: "Tumhare saath baat karke mujhe sukoon milta hai",
    },
    {
      image:
        "/public/WhatsApp Image 2025-04-12 at 12.32.17.jpeg",
      text: "Please give me a chance to understand you better... If i get the chance. I will do my best",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);

  useEffect(() => {
    const sectionHeight = window.innerHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newIndex = Math.min(
        Math.floor(scrollY / sectionHeight),
        data.length - 1
      );

      if (newIndex !== currentIndex) {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex(newIndex);
          setFade(true);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex, data.length]);

  useEffect(() => {
    if (currentIndex === data.length - 1) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
      setNoClickCount(0);
    }
  }, [currentIndex, data.length]);

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
  };

  const getDialogText = () => {
    if (noClickCount === 0) return 'What if my future started - the moment you said "YES"';
    if (noClickCount === 1) return "Phir soch lo";
    if (noClickCount === 2) return "Mere jesa koi milega?";
    return "Okay! Me tera humesa intzar karunga";
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-10">
        <img
          src={data[currentIndex].image}
          alt="scroll"
          className={`w-screen h-screen object-cover transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30 z-20 transition-opacity duration-500" />

      {/* Text */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white text-2xl font-bold z-30 text-center px-4 ">
        {data[currentIndex].text}
      </div>

      {/* Scrollable Sections */}
      <div className="relative z-0">
        {data.map((_, i) => (
          <div key={i} className="min-h-screen"></div>
        ))}
      </div>

      {/* Dialog Box */}
      <div className="h-full flex justify-center items-center">{showDialog && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black p-6 rounded-xl shadow-lg z-40 w-[300px] text-center space-y-4 transition-all duration-500">
          <p className="text-lg font-medium">{getDialogText()}</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => alert("Accepted ❤️")}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default App;
