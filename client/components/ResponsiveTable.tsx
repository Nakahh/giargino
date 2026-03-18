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
      <div className="hidden md:block overflow-x-auto rounded-lg border-t-4" style={{ borderTopColor }}>
        <table className="w-full">
          <thead>
            <tr
              className="border-b-2"
              style={{ backgroundColor: headerBgColor, borderBottomColor: borderTopColor }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 lg:px-6 py-4 text-sm font-bold whitespace-nowrap text-${
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
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={`${idx}-${col.key}`}
                    className={`px-4 lg:px-6 py-4 text-sm text-${
                      col.align === "right" ? "right" : col.align === "center" ? "center" : "left"
                    } text-gray-700`}
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
            className="rounded-lg p-4 border-l-4 bg-white"
            style={{ borderLeftColor: borderTopColor, backgroundColor: `${borderTopColor}08` }}
          >
            <div className="space-y-2">
              {columns.map((col) => (
                <div key={`${idx}-${col.key}`} className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-sm" style={{ color: borderTopColor }}>
                    {col.label}:
                  </span>
                  <span className="text-sm text-gray-700 text-right">
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
