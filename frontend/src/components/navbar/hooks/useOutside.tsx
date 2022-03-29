import { useEffect } from "react";

interface Props {
	Ref: React.RefObject<HTMLFormElement>;
	setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

function useOutside({ Ref, setFunction }: Props) {
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (Ref.current && !Ref.current.contains(e.target as Node)) {
				setFunction(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [Ref]);
}

export default useOutside;
