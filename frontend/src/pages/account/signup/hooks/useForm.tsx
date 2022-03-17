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
};
