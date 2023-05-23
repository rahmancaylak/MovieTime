import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ErrorText:React.FC<Props> = ({ children, ...props }) => {
  return (
    <p className={props.className ? props.className : styles.error}>
      {children}
    </p>
  );
}

export default ErrorText;