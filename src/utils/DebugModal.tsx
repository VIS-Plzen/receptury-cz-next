"use client";
import Modal from "@/components/ui/Modal";
import packageJson from "../../package.json";

// ToDo:
// - Až budeme mít context s přihlášením, musíme vypsat i informace o backendu S4 & S5

export default function DebugModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Ladící informace"
      width="md"
    >
      <div className="flex flex-col items-start justify-start gap-6 py-6 text-left leading-tight">
        <div className="flex max-w-xl flex-col">
          {/* O aplikaci */}
          <span className="text-rich block text-xl font-bold">O aplikaci:</span>
          <div className="text-muted mt-1 flex flex-col text-left text-base">
            <span>
              <b>Prostředí: </b> {process.env.NEXT_PUBLIC_ENVIRONMENT}
            </span>
            {process.env.GITHUB_BRANCH_NAME && (
              <span>
                <b>Git větev: </b> {process.env.GITHUB_BRANCH_NAME}
              </span>
            )}
            <span>
              <b>Verze aplikace: {packageJson.version}</b>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
