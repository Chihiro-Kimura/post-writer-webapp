import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose max-w-none">
      <Component />
    </div>
  );
}
