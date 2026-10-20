import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
export function InfoDialog({
  title,
  label,
  children,
  className = "text-link",
}: {
  title: string;
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    const close = () => ref.current?.close();
    router.events.on("routeChangeStart", close);
    router.events.on("hashChangeStart", close);
    return () => {
      router.events.off("routeChangeStart", close);
      router.events.off("hashChangeStart", close);
    };
  }, [router.events]);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => ref.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        className="dialog-backdrop dialog-panel fixed m-auto w-[calc(100%-2rem)] max-w-lg border border-black bg-white p-6 text-black"
        aria-label={title}
      >
        <div className="mb-5 flex items-start justify-between gap-6 border-b border-black pb-4">
          <h2 className="font-display text-lg font-bold uppercase">{title}</h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close dialog"
            className="p-1 hover:bg-plate"
          >
            <X size={18} />
          </button>
        </div>
        <div className="text-sm leading-6">{children}</div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="button mt-6 w-full"
        >
          Close technical sheet
        </button>
      </dialog>
    </>
  );
}
