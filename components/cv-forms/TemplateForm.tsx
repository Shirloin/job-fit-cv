import Image from 'next/image';
import { Card } from '../ui/card';
import { useTemplateStore } from '@/store/template-store';

export default function TemplateForm() {
  const { index, setTemplate } = useTemplateStore();

  return (
    <>
      <div className="w-full flex flex-wrap justify-between mt-4 font-normal gap-4">
        <Card
          className={`p-1 ${index === 0 ? 'border-primary' : ''} border-2`}
          onClick={() => setTemplate(0)}
        >
          <Image
            width={220}
            height={100}
            src="/assets/template/first-cv.png"
            alt=""
          />
        </Card>
        <Card
          className={`p-1 ${index === 1 ? 'border-primary' : ''} border-2`}
          onClick={() => setTemplate(1)}
        >
          <Image
            width={220}
            height={100}
            src="/assets/template/second-cv.jpg"
            alt=""
          />
        </Card>
        <Card
          className={`p-1 ${index === 2 ? 'border-primary' : ''} border-2`}
          onClick={() => setTemplate(2)}
        >
          <Image
            width={220}
            height={100}
            src="/assets/template/third-cv.png"
            alt=""
          />
        </Card>
        <Card
          className={`p-1 ${index === 3 ? 'border-primary' : ''} border-2`}
          onClick={() => setTemplate(3)}
        >
          <Image
            width={220}
            height={100}
            src="/assets/template/fourth-cv.png"
            alt=""
          />
        </Card>
        <Card
          className={`p-1 ${index === 4 ? 'border-primary' : ''} border-2`}
          onClick={() => setTemplate(4)}
        >
          <Image
            width={220}
            height={100}
            src="/assets/template/fifth-cv.png"
            alt=""
          />
        </Card>
      </div>
    </>
  );
}
