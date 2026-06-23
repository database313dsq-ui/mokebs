import { FourSquare } from "react-loading-indicators"


interface LoadingType {
    loadingState: boolean;
}

const Loading = ({loadingState}: LoadingType) => {
    return loadingState && <div className="w-full flex items-center justify-center"><FourSquare color="#bf0c0c" size="small" text="دار سفوان القرآنية" textColor="" /></div>
};

export default Loading;