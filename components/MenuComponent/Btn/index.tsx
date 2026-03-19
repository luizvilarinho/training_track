import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  btnName: string
  href: string
  icon: any
}

const Btn = (props: Props) => {
  const router = useRouter();

  const isActive = props.href === '/'
    ? router.pathname === '/'
    : router.pathname.startsWith(props.href);

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <li onClick={handleClick} className={isActive ? 'active' : ''}>
      <FontAwesomeIcon icon={props.icon} />
      {props.btnName}
    </li>
  );
};

export default Btn;
