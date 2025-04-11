import { X } from 'lucide-react';

function SettingsPage({ onClose }) {
    return(
        <div>
            <div className="flex flex-row justify-between">
                <h2 className="text-lg font-bold">Settings</h2>
                <X className="w-7 h-7 cursor-pointer text-black hover:scale-110 hover:text-red-500"
                   onClick={onClose}
                />
            </div>
            
        </div>
    )
}

export default SettingsPage;
