"use client";
import Container from "@/components/ui/Container";
import { useDebugMode } from "@/hooks/useDebugMode";
import DebugModal from "@/utils/DebugModal";
import { useState } from "react";

export default function Footer() {
  // Debug mode
  const [isDebugModalOpen, setIsDebugModalOpen] = useState(false);
  const { isDebugModeEnabled, updateDebugModeClickCount } = useDebugMode();

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="w-full items-center border-t-2 border-primary-200 bg-white">
        <Container className="flex items-center justify-center py-16 print:hidden">
          <div className="flex flex-col justify-center justify-center gap-5 text-base">
            <p>
              <button
                onClick={updateDebugModeClickCount}
                className="mr-1 cursor-default"
              >
                &copy;
              </button>
              {currentYear} receptury.jidelny.cz
            </p>

            {isDebugModeEnabled && (
              <button
                className="font-bold hover:text-primary"
                onClick={() => setIsDebugModalOpen(true)}
              >
                Ladící informace
              </button>
            )}
          </div>
        </Container>
      </footer>
      {/* Debug Modal */}
      <DebugModal isOpen={isDebugModalOpen} setIsOpen={setIsDebugModalOpen} />
    </>
  );
}
