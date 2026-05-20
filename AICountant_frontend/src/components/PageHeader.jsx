
export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="px-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
          {subtitle ? <p className="text-slate-600 mt-1">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
}

