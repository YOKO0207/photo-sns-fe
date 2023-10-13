import { ErrorCard } from "@/components/organisms";

const Error403Page = () => {
  return (
		<>
			<ErrorCard errorCode={403} errorMessage="権限がありません。" />
		</>
	);
}

export default Error403Page;