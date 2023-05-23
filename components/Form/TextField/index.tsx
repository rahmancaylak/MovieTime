import styles from './styles.module.css';

interface Props {
  id: string;
  labelClass?: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label: string;
  type: 'text' | 'email' | 'password';
}

const TextField:React.FC<Props> = ({ labelClass, ...props }) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className={labelClass ? labelClass : styles.label}
      >
        {props.label}
      </label>
      <input
        {...props}
        className={props.className ? props.className : styles.input}
      />
    </>
  );
}

export default TextField;