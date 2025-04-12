import { Flag } from 'lucide-react';
import SettingsButton from './SettingsButton';
import Bolt from '../assets/Bolt.svg';

function PopupLayout(props) {
    return (
      <div className="p-3 flex flex-col gap-2 font-[lora]">
        <div className="content-center flex flex-row justify-between gap-4">
          <div className="flex flex-row content-center gap-x-1">
            <img src={Bolt} alt="Bolt" className="w-9 h-9" />
            <div className="place-content-center font-bold text-xl">Zeus</div>
          </div>  
          <div className="flex flex-row gap-x-2.5 items-center content-center place-content-center">
            <SettingsButton isDark={props.isDark} setIsDark={props.setIsDark}/>
            <Flag className="w-7 h-7 
                            cursor-pointer
                            text-black
                            hover:text-yellow-500
                            hover:scale-110
                            transition
                            duration-100
                            ease-in-out
                            place-content-center
                            dark:text-gray-100"/>
          </div>
        </div>
        <div>
          {props.children}
        </div>
      </div>
    );
}

export default PopupLayout;