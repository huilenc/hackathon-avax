import Image from "next/image";
import { Vina_Sans } from "next/font/google";

const vinaSans = Vina_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1 animate-fade-in">
          <span
            className={`${vinaSans.className} text-[#CD0105] dark:text-[#EFC2B3] text-4xl`}
          >
            Free
          </span>
          <Image
            src="/20250524_1542_Cute Animated Cup_remix_01jw1btvxtffmb1pe0ydt88ac4.png"
            alt="FreeCup"
            width={40}
            height={40}
            className="relative flex items-center justify-center"
          />
          <span
            className={`${vinaSans.className} text-[#CD0105] dark:text-[#EFC2B3] text-4xl relative`}
          >
            Cup
          </span>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-[#CD0105] to-[#EFC2B3] rounded-full animate-pulse" />
      </div>
    </div>
  );
}
