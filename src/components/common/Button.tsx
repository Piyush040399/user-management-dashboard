interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
