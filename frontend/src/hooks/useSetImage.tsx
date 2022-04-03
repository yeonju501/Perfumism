function useSetImage(e: React.ChangeEvent<HTMLInputElement>) {
	const image = e.target.files;
	if (image) {
		if (image[0].size > 10 * 1024 * 1024) {
			alert("10MB 이상의 이미지 파일은 등록할 수 없습니다.");
			return null;
		}
		return image[0];
	}
	return null;
}

export default useSetImage;
