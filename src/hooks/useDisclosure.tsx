import { useState, useCallback } from 'react';

const useDisclosure = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, []);
	const onClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	return { isOpen, onOpen, onClose };
};

export default useDisclosure;
