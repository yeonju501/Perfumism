export const validateEmailForm = (email: string) => {
	const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	return regExp.test(email);
};

export const validatePassword = (password: string) => {
	const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;
	return regExp.test(password);
};

export const validatenameEmpty = (nickname: string) => {
	return nickname ? true : false;
};

export const validateNicknameLength = (nickname: string) => {
	return nickname.length > 2 && nickname.length < 10 ? true : false;
};
