import { useRef, useEffect } from 'react';

// const [inRunning setIsRunning] = useState(true);
// ex useInterval(() =>{
//     console.log('hello');
//}, isRunning ? 1000 : null);     값이 false로 바뀔경우 훅 인터벌이 멈추도록 할 수 있음.

// custom hooks
function useInterval(callback, delay) {
    const saveCallback = useRef();         // 항상 최신 객체를 참조할 수 있다는게 장점

    useEffect(() => {
        saveCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            saveCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);    // tick() 메서드에 최신 callback 함수를 담아서 사용하게 하려는 기법
            return () => clearInterval(id);
        }
    }, [delay]);

    return saveCallback.current;
}

export default useInterval;