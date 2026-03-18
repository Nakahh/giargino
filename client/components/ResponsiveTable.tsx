interface ResponsiveTableProps {
  columns: {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    format?: (value: any) => string;
  }[];
  data: Record<string, any>[];
  borderTopColor?: string;
  headerBgColor?: string;
  headerTextColor?: string;
}

export function ResponsiveTable({
  columns,
  data,
  borderTopColor = "#1F3B5E",
  headerBgColor = "#1F3B5E15",
  headerTextColor = "#1F3B5E",
}: ResponsiveTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border-t-4 shadow-lg" style={{ borderTopColor }}>
        <table className="w-full bg-white">
          <thead>
            <tr
              className="border-b-2 font-montserrat"
              style={{
                backgroundColor: headerBgColor,
                borderBottomColor: borderTopColor,
                background: `linear-gradient(135deg, ${borderTopColor}15 0%, ${borderTopColor}08 100%)`
              }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 lg:px-6 py-4 text-xs md:text-sm font-bold whitespace-nowrap uppercase tracking-wider text-${
                    col.align === "right" ? "right" : col.align === "center" ? "center" : "left"
                  }`}
                  style={{ color: headerTextColor }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={`${idx}-${col.key}`}
                    className={`px-4 lg:px-6 py-4 text-sm text-${
                      col.align === "right" ? "right" : col.align === "center" ? "center" : "left"
                    } text-gray-700 font-medium`}
                  >
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4 border-l-4 bg-white shadow-md hover:shadow-lg transition-shadow"
            style={{
              borderLeftColor: borderTopColor,
              backgroundColor: `${borderTopColor}05`,
              borderLeftWidth: '4px'
            }}
          >
            <div className="space-y-3">
              {columns.map((col) => (
                <div key={`${idx}-${col.key}`} className="flex justify-between items-start gap-3">
                  <span className="font-bold text-xs uppercase tracking-wider flex-shrink-0" style={{ color: borderTopColor }}>
                    {col.label}
                  </span>
                  <span className="text-sm font-medium text-gray-800 text-right flex-1">
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
