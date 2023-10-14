import { FC, ReactNode } from "react";
import { SWRConfig as Config } from "swr";
import { useErrorBoundary } from "react-error-boundary";

interface Props {
  children: ReactNode;
}
export const SWRConfig: FC<Props> = (props) => {
	const { children } = props;
  const { showBoundary } = useErrorBoundary();
	
  return (
		<Config
			value={{
				onError: (error) => {
					showBoundary(error);
				},
			}}
		>
			{children}
		</Config>
	);
}