export default function FilterPanel({
  status,
  setStatus,
  dateFilter,
  setDateFilter
}) {
  return (
    <div className="filter-panel">
<div className="filter-panel">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="">
          All Status
        </option>
        <option value="active">
          Active
        </option>
        <option value="archived">
          Archived
        </option>
      </select>

      <select
        value={dateFilter}
        onChange={(e) =>
          setDateFilter(e.target.value)
        }
      >
        <option value="">
          All Time
        </option>
        <option value="7">
          Last 7 Days
        </option>
      </select>
</div>
    </div>
  );
}