interface Props {
  message: string;
}

const Message = ({ message }: Props) => {
  return (
    <div className="bg-white w-60 h-40 font-bold flex items-center justify-center">
      {message}
    </div>
  );
};

export default Message;
