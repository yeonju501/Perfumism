function useSetImage(e: React.ChangeEvent<HTMLInputElement>) {
	const image = e.target.files;

	if (image && image[0]) {
		if (image[0].size > 10 * 1024 * 1024) {
			alert("10MB 이상의 이미지 파일은 등록할 수 없습니다.");
			return;
		}
		return image[0];
	}
}

export default useSetImage;
