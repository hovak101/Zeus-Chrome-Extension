import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';

function LoadingPage(props) {
    return (<Lottie animationData={loadingAnim} loop={true}/>);
}

export default LoadingPage;