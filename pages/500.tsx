import { ErrorCard } from "@/components/organisms";

const Error500Page = () => {
  return <>
	<ErrorCard errorCode={500} errorMessage="サーバーエラーが発生しました。" />
  </>
}

export default Error500Page;