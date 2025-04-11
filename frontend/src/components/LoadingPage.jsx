import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

function LoadingPage(props) {
    return (
        <div className="bg-transparent">
            <Lottie animationData={loadingAnim} loop={true}/>
        </div>
    );
}

export default LoadingPage;