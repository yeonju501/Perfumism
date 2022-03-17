interface Props {
	label: string;
}

function LoginButton({ label }: Props) {
	return <button>{label}</button>;
}

export default LoginButton;
