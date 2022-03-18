export const validateEmailForm = (email: string): boolean => {
	const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	if (email) return regExp.test(email);
	return false;
};

export const validatePassword = (password: string): boolean => {
	const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
	if (password) return regExp.test(password);
	return false;
};

export const validateUsername = (nickname: string): boolean => {
	return nickname.length > 2 && nickname.length < 10 ? true : false;
};
