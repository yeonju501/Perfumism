// 스타일 테마 모음

const size = {
	tabletS: "1060px",
	mobile: "790px",
	mobileS: "600px",
};

const theme = {
	mobile: `(max-width: ${size.mobile})`,
	mobileS: `(max-width:${size.mobileS})`,
	tabletS: `(max-width: ${size.tabletS})`,
};

export default theme;
