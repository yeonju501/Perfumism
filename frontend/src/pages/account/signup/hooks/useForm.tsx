import React, { useState } from "react";
import { formValidator } from "utils";

interface UseFormArgs {
	initialValues: { [key: string]: string };
	onSubmit: (values: { [key: string]: string }) => Promise<void>;
	onBlur: (name: string, value: string) => Promise<boolean | undefined>;
}

const useForm = ({ initialValues, onSubmit, onBlur }: UseFormArgs) => {
	const [isValid, setIsValid] = useState({
		email: false,
		username: false,
		password: false,
	});

	const [values, setValues] = useState(initialValues);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value.trim() });
		checkDuplicate(name, value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await onSubmit(values);
	};

	const checkDuplicate = async (name: string, value: string) => {
		if (name === "password") {
			checkValid(name, value);
			return;
		} else {
			const result = await onBlur(name, value);
			const isValidForm = checkValid(name, value);
			if (!result && isValidForm) {
				setIsValid({ ...isValid, [name]: true });
			}
		}
	};
};
