interface FeatureItemProps {
  title: string;
}

export default function FeatureItem({ title }: FeatureItemProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 py-5 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
      </div>
    </>
  );
}
