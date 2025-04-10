import { X } from 'lucide-react';
import { Switch } from "./Switch.tsx"

function SettingsPage({ onClose }) {
    return(
        <div className="dark:bg-gray-900 flex flex-col gap-3">
            <div className="flex flex-row justify-between">
                <h2 className="text-lg font-bold">Settings</h2>
                <X className="w-7 h-7 cursor-pointer text-black dark:text-gray-100 hover:scale-110 hover:text-red-500"
                   onClick={onClose}
                />
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 gap-2.5">
                    <Switch id="airplane-mode" />
                    <div className="text-lg">Dark Mode</div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;
