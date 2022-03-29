function useSetImage(e: React.ChangeEvent<HTMLInputElement>) {
	const image = e.target.files;
	if (image) return image[0];
}

export default useSetImage;
