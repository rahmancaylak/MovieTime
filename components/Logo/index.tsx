import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  icon: JSX.Element;
}

const Logo:React.FC<Props> = ({ children, icon}) => {
  return (
    <>
      <i className={styles.icon}>{icon}</i>
      <p className={styles.logoText}>{children}</p>
    </>
  );
}

export default Logo;