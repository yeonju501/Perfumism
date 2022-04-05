import { Button, Modal } from "react-bootstrap";

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function VoteCreate({ isModalOpen, setIsModalOpen }: Props) {
	const handleClose = () => setIsModalOpen(false);

	return (
		<>
			<Modal show={isModalOpen} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>투표 추가</Modal.Title>
				</Modal.Header>
				<Modal.Body>투표 내용</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">등록</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default VoteCreate;
