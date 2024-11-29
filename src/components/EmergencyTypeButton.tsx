import { LucideIcon } from "lucide-react";

interface EmergencyTypeButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const EmergencyTypeButton = ({ icon: Icon, label, onClick }: EmergencyTypeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors w-full gap-2 border border-gray-200"
    >
      <Icon className="w-8 h-8 text-emergency" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default EmergencyTypeButton;