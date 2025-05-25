async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
  return { data: "test" };
}

export default async function TestPage() {
  const data = await getData();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Data loaded!</h1>
    </div>
  );
}
