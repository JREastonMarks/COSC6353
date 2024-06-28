import eventManager from ''
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="rounded-lg border shadow-lg p-10 items-center justify-between">
        <div className="font-bold">Super Awesome Event Manager!</div>
        <img className="center" src="/eventManager.jpeg" />
        <a href="/login">Click here to login</a>
      </div>
    </main>
  );
}
