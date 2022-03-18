import React, { useState } from "react";

interface UseFormArgs {
	initialValues: { [key: string]: string };
	onSubmit: (values: { [key: string]: string }) => Promise<void>;
	onBlur: (name: string, value: string) => Promise<boolean | undefined>;
	validate: (values: { [key: string]: string }) => { [key: string]: string };
}

const useForm = ({ initialValues, onSubmit, onBlur, validate }: UseFormArgs) => {
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [values, setValues] = useState(initialValues);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value.trim() });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newErrors = validate ? validate(values) : {};
		if (Object.keys(newErrors).length === 0) {
			await onSubmit(values);
		}
		setErrors(newErrors);
	};

	const checkDuplicate = async (event: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const result = await onBlur(name, value);
		if (result && name === "email") setErrors({ ...errors, [name]: "이미 존재하는 이메일입니다." });
		if (result && name === "username")
			setErrors({ ...errors, [name]: "이미 존재하는 유저네임입니다." });
	};

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		checkDuplicate,
	};
};

export default useForm;
