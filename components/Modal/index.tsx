import { FaExclamationCircle, FaCheck } from 'react-icons/fa';


interface Props {
  status: 'error' | 'success';
  message: string;
}

const Modal:React.FC<Props> = (props) => {
  return (
    <>
      <div className='relative w-auto my-6 mx-auto max-w-3xl'>
        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none'>
          <div className='relative p-6 flex flex-col justify-center items-center'>
            {props.status === 'error' ? (
              <FaExclamationCircle
                className='border-2 border-red-500 rounded-full p-2 text-red-500'
                size={60}
              />
            ) : (
              <FaCheck
                className='border-2 border-green-500 rounded-full p-2 text-green-500'
                size={60}
              />
            )}
            <h2 className='text-white text-2xl mt-6 text-center'>
              {props.message}
            </h2>
          </div>
          {/*footer*/}
        </div>
      </div>
    </>
  );
}

export default Modal;