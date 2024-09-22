import { BuilderPageServer } from '@/components/hooks/BuilderPageServer';
import BuilderPage from './_components/BuilderPage';

export default async function BuilderPageWrapper({ params }: { params: { id: string } }) {
  const { form } = await BuilderPageServer({ id: params.id });
  return (
  <div className='flex items-center justify-center mx-auto my-3 pb-4 flex-col'>
  <BuilderPage form={form} />
  </div>)
}