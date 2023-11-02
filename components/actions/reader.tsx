import { Suspense } from "react";

const Reader = async ({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any> | null;
}) => {
  if (!reader) return null;

  const { done, value } = await reader.read();

  if (done) return null;

  const text = new TextDecoder().decode(value);

  return (
    <div>
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </div>
  );
};

export default Reader;
