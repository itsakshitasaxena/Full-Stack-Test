import React, { useState, useMemo } from "react";

export default function Table({
  columns,
  data,
  selectable,
  selectedMap,
  onSelect,
  onRowClick,
  bulkActions = [],
  onBulkAction,
  searchable = true,
  filterable = false,
  filters = []
}) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const filteredData = useMemo(() => {
    let filtered = data.filter(row =>
      columns.some(col =>
        String(row[col.key] || "").toLowerCase().includes(search.toLowerCase())
      )
    );

    filters.forEach(filter => {
      if (activeFilters[filter.key]) {
        filtered = filtered.filter(row => row[filter.key] === activeFilters[filter.key]);
      }
    });

    return filtered;
  }, [data, search, activeFilters, columns, filters]);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const newSelected = {};
    if (checked) {
      filteredData.forEach(row => {
        newSelected[row.id] = true;
      });
    }
    onSelect?.(null, checked, newSelected);
  };

  const selectedCount = Object.values(selectedMap || {}).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {searchable && (
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {filterable && filters.map(filter => (
          <select
            key={filter.key}
            value={activeFilters[filter.key] || ""}
            onChange={(e) => setActiveFilters(prev => ({ ...prev, [filter.key]: e.target.value || undefined }))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{filter.label}</option>
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}

        {selectable && selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{selectedCount} selected</span>
            {bulkActions.map(action => (
              <button
                key={action.key}
                onClick={() => onBulkAction?.(action.key, Object.keys(selectedMap).filter(k => selectedMap[k]))}
                className={`px-3 py-1 text-sm rounded ${action.className || 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left">
              {selectable && (
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map(c => (
                <th key={c.key} className="p-3 font-semibold text-gray-700">{c.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr key={row.id || i} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  {selectable && (
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={Boolean(selectedMap?.[row.id])}
                        onChange={(e) => onSelect?.(row, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map(c => (
                    <td
                      key={c.key}
                      className="p-3 cursor-pointer"
                      onClick={() => onRowClick?.(row)}
                    >
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-600">
        Showing {filteredData.length} of {data.length} entries
      </div>
    </div>
  );
}
