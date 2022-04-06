// 스타일 테마 모음

const size = {
	tabletS: "1060px",
	mobile: "790px",
	mobileS: "600px",
	mobileXS: "450px",
};

const theme = {
	mobile: `(max-width: ${size.mobile})`,
	mobileS: `(max-width:${size.mobileS})`,
	mobileXS: `(max-width:${size.mobileXS})`,
	tabletS: `(max-width: ${size.tabletS})`,
};

export default theme;
