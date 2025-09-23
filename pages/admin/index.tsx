export default function AdminHome() {
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Admin</h1>
      <ul className="list-disc pl-5">
        <li><a href="/admin/projects">Projects</a></li>
        <li><a href="/admin/certificates">Certificates</a></li>
        <li><a href="/admin/experiences">Experiences</a></li>
      </ul>
    </main>
  );
}
