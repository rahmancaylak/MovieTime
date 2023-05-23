// Services
import { FetchAPI } from '@/utils/fetchAPI';
import { Header, Modal } from '@/components';
import { notFound } from 'next/navigation';

export default async function VerifyEmail({ searchParams }) {
  if (
    !searchParams ||
    searchParams == undefined ||
    !searchParams.key ||
    searchParams.key == '' ||
    !searchParams.time ||
    searchParams.time == '' ||
    !searchParams.email ||
    searchParams.email == ''
  )
    return notFound();
  // !Search Params kontrol edilecek.
  const fetchApi = new FetchAPI();
  const data = await fetchApi
    .post(
      {
        controller: 'auth/verifyEmail',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      searchParams,
      'no-cache'
    )
    .then((res) => res.json());
  return (
    <>
      <Header />
      {data.status === 200 ? (
        <Modal status='success' message={data?.message} />
      ) : (
        <Modal status='error' message={data?.message} />
      )}
    </>
  );
}
