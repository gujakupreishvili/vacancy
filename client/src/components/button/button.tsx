import type { ButtonProps } from "../../types";



export default function Button({
  text,
  icon: Icon,
  className = "",
  pTagStyle,
  iconStyle,
  isSelected = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        ${className}
        ${isSelected ? "bg-[#E3E8EF]" : ""}
      `}
    >
      {Icon && <Icon className={iconStyle} />}
      {text && <p className={pTagStyle}>{text}</p>}
    </button>
  );
}
