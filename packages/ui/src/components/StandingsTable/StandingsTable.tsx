import Link from 'next/link';
import Image from 'next/image';

export interface StandingsTableRow {
  position: number;
  team: { name: string; shortName: string; crestUrl: string; slug: string };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export function StandingsTable({ rows }: { rows: StandingsTableRow[] }) {
  return (
    <div className="bg-surface-800 rounded-2xl border border-white/5 overflow-x-auto">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="text-surface-400 text-xs uppercase border-b border-white/5">
            <th className="text-left font-semibold px-4 py-3 w-8">#</th>
            <th className="text-left font-semibold px-2 py-3">Team</th>
            <th className="text-center font-semibold px-2 py-3">P</th>
            <th className="text-center font-semibold px-2 py-3">W</th>
            <th className="text-center font-semibold px-2 py-3">D</th>
            <th className="text-center font-semibold px-2 py-3">L</th>
            <th className="text-center font-semibold px-2 py-3">GD</th>
            <th className="text-center font-semibold px-4 py-3">Pts</th>
            <th className="text-left font-semibold px-4 py-3">Form</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.team.slug} className="border-b border-white/5 last:border-0 hover:bg-white/5">
              <td className="px-4 py-3 text-surface-400">{r.position}</td>
              <td className="px-2 py-3">
                <Link href={`/sports/teams/${r.team.slug}`} className="flex items-center gap-2 font-semibold text-white hover:text-blue-300">
                  <Image src={r.team.crestUrl} alt="" width={20} height={20} className="rounded-full" />
                  <span className="whitespace-nowrap">{r.team.name}</span>
                </Link>
              </td>
              <td className="px-2 py-3 text-center text-surface-300">{r.played}</td>
              <td className="px-2 py-3 text-center text-surface-300">{r.won}</td>
              <td className="px-2 py-3 text-center text-surface-300">{r.drawn}</td>
              <td className="px-2 py-3 text-center text-surface-300">{r.lost}</td>
              <td className="px-2 py-3 text-center text-surface-300">{r.goalsFor - r.goalsAgainst}</td>
              <td className="px-4 py-3 text-center font-bold text-white">{r.points}</td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  {r.form.slice(-5).map((f, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white ${
                        f === 'W' ? 'bg-emerald-500' : f === 'D' ? 'bg-surface-500' : 'bg-indimba-red-500'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
