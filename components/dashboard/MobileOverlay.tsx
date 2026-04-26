"use client";

interface MobileOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileOverlay({ isOpen, onClose }: MobileOverlayProps) {
    if (!isOpen) return null;

    return (
        <div
            className="min-[900px]:hidden fixed inset-0 bg-black/50 z-[190] transition-opacity duration-300"
            style={{ opacity: isOpen ? 1 : 0 }}
            onClick={onClose}
            aria-hidden="true"
        />
    );
}
