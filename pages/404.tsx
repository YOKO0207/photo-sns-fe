import { Icon } from "@iconify/react";
import { ErrorCard } from "@/components/organisms";

const Error404Page = () => {
  return (
		<>
		<ErrorCard errorCode={404} errorMessage="ページが見当たりません。" />
		</>
	);
}

export default Error404Page;