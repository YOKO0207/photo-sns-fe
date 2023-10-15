import { useMe } from "@/hooks"

const IndexPage = () => {
	const { user } = useMe()
	console.log(user)
	return <div>Hello Next.js</div>
}

export default IndexPage