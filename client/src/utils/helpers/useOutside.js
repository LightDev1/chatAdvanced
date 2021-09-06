import { useEffect } from 'react'

const useOutside = (el, callback) => {
    const handleClick = (event) => {
        if (el && el.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    })
};

export default useOutside;