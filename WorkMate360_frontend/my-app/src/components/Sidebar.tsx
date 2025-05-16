export function Sidebar() {
  return (
    <div className="fixed top-32 left-0 w-50 h-[calc(100vh-8rem)] bg-slate-600 text-white p-4 z-50">
      <ul>
        <li className="py-2 border-b border-slate-500">Dashboard</li>
        <li className="py-2 border-b border-slate-500">Profile</li>
        <li className="py-2 border-b border-slate-500">Settings</li>
      </ul>
    </div>
  );
}