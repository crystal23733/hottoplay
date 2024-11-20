export default interface ButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}
