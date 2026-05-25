interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm">{label}</label>

      <input
        {...props}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
