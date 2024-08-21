export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 flex-1 bg-white rounded-lg shadow">
      {children}
    </div>
  )
}
