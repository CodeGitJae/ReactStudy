const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('재훈');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(word[word.length -1] === value[0]) {
            setResult('빙고');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
            <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input id="wordInput" className='wordInput' value={value} onChange={onChangeInput} ref={inputRef} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;