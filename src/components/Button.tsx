function Button({ text, iconSrc, onClick }: { text: string, iconSrc?: string, onClick?: () => void; }) {
  return (
    <button onClick={onClick} className="bg-violet-400 hover:bg-violet-700 text-cyan-50 font-semibold py-2 px-4 rounded text-center">
      {iconSrc && <img src={iconSrc} alt="" className="inline-block" />}
      {text}
    </button>
  );
}

export default Button;