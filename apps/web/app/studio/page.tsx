export default function StudioOverviewPage() {
  return (
    <div>
      <h2 className="font-extrabold text-xl text-white mb-6">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '—' },
          { label: 'Articles', value: '—' },
          { label: 'Tracks', value: '—' },
          { label: 'Earnings', value: '—' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-800 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-surface-400 mb-1">{stat.label}</p>
            <p className="text-xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
