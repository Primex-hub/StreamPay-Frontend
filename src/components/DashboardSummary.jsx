import { useStreams } from '../hooks/useStreams.js';
import StatCard from './StatCard.jsx';
import './DashboardSummary.css';

/**
 * Count how many streams in a list are currently active.
 * @param {object[]} streams
 * @returns {number}
 */
function activeCount(streams) {
  return streams.filter((s) => s.status === 'active').length;
}

/**
 * Aggregate metric row shown at the top of the dashboard.
 */
export default function DashboardSummary() {
  const incoming = useStreams('incoming');
  const outgoing = useStreams('outgoing');

  const loading = incoming.loading || outgoing.loading;

  return (
    <div className="dashboard-summary">
      <StatCard
        icon="📥"
        label="Incoming"
        value={loading ? '…' : incoming.streams.length}
        hint={`${activeCount(incoming.streams)} active`}
      />
      <StatCard
        icon="📤"
        label="Outgoing"
        value={loading ? '…' : outgoing.streams.length}
        hint={`${activeCount(outgoing.streams)} active`}
      />
      <StatCard
        icon="🔥"
        label="Total active"
        value={
          loading
            ? '…'
            : activeCount(incoming.streams) + activeCount(outgoing.streams)
        }
        hint="streaming right now"
      />
    </div>
  );
}
