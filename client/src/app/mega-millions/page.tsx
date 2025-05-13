import MegaMillions from '@/megamillions/components/features/MegaMillionsGenerate.ts/MegaMillions';

export default function MegaMillionsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MegaMillions Number Generator</h1>
        <p className="text-muted-foreground">
          Generate your MegaMillions numbers using different strategies. Choose your preferred
          method and get your lucky numbers!
        </p>
      </div>

      <MegaMillions />
    </div>
  );
}
