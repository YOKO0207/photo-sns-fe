import { AppLayout } from "@/components/layouts"
import { NextPage } from "next"
import { useUserContext } from "@/states/contexts";

const IndexPage: NextPage = () => {
	const { state: user } = useUserContext();
	return (
		<AppLayout>
			<div>Index Page</div>
		</AppLayout>
	)
}

export default IndexPage