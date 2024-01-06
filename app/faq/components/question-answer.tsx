import HrefButton from "./href-button";

type ButtonProps = {
  href: string;
  text: string;
};

type QuestionAnswerProps = {
  question: string;
  answer: string;
  buttonProps?: ButtonProps;
};

const QuestionAnsnwer = (props: QuestionAnswerProps) => {
  return (
    <div className="flex flex-col lg:space-y-5 space-y-3">
      <h3 className="lg:text-xl text-base font-normal italic text-c_green">
        {props.question}
      </h3>
      <p className="lg:text-base text-xs font-light text-justify">
        {props.answer}
      </p>
      {props.buttonProps?.href && (
        <HrefButton
          href={props.buttonProps?.href}
          text={props.buttonProps?.text}
        />
      )}
    </div>
  );
};

export default QuestionAnsnwer;
