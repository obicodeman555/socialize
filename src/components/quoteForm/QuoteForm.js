import { useRef } from "react";
// import { Prompt } from "react-router-dom";

const QuoteForm = (props) => {
  const authorRef = useRef(null);
  const textRef = useRef(null);
  // const [isEntering, setIsEntering] = useState(false);

  //submit
  const submitHandler = (e) => {
    e.preventDefault();

    props.onAddQuote({
      text: textRef.current.value,
      author: authorRef.current.value,
    });
  };

  // const formFocusedHandler = () => {
  //   setIsEntering(true);
  // };
  // const finishEnteringHandler = () => {
  //   setIsEntering(false);
  // };

  return (
    <>
      {/* <Prompt
        when={isEntering}
        message={() => "Leaving this page will make u loose any enetered data"}
      /> */}
      <form onSubmit={submitHandler}>
        {props.isLoading && <div>Loading...</div>}

        <div>
          <label>Author</label>
          <input type="text" ref={authorRef} />
        </div>
        <div>
          <label>text</label>
          <textarea rows="10" cols="30" ref={textRef}></textarea>
        </div>
        <div>
          <button type="submit">Add Quote</button>
        </div>
      </form>
    </>
  );
};

export default QuoteForm;
