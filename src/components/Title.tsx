interface TitleProps {
  title: string; 
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="w-100 flex justify-center border-b-[1px] p-8 mb-8">
      <h5>
        {title} 
      </h5>
    </div>
  );
};

export default Title;