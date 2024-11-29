import { LucideIcon } from "lucide-react";

interface EmergencyTypeButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isSelected?: boolean;
}

const EmergencyTypeButton = ({ icon: Icon, label, onClick, isSelected }: EmergencyTypeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors w-full gap-2 border ${
        isSelected
          ? "bg-emergency/10 border-emergency"
          : "bg-white border-gray-200"
      }`}
    >
      <Icon className={`w-8 h-8 ${isSelected ? "text-emergency" : "text-emergency/60"}`} />
      <span className={`text-sm font-medium ${isSelected ? "text-emergency" : "text-gray-700"}`}>{label}</span>
    </button>
  );
};

export default EmergencyTypeButton;