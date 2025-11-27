export type ButtonProps = {
  text?: string;
  icon?: React.ElementType | undefined;
  className?: string;
  pTagStyle?: string;
  iconStyle?: string;
  isSelected?: boolean;
  onClick?: () => void;
};
export type SendMessageTypes = {
  fullName:string,
  email: string,
  phone: string,
  resume: File | null;
}