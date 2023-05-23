import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const Button:React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button className={className ? className : styles.button} {...rest}>
      {children}
    </button>
  );
}

export default Button;
