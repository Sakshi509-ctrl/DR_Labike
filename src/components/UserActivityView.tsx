import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-expect-error - JS module
import apiService from '../services/apiService';

interface ChangeLog {
  _id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  timestamp: string;
  editorName?: string;
  editorEmail?: string;
  editorDetails?: { name: string; email: string; timestamp: string };
  blogId?: { _id?: string; title?: string };
}

const UserActivityView: React.FC = () => {
  const navigate = useNavigate();
  const { email = '' } = useParams<{ email: string }>();
  const [logs, setLogs] = useState<ChangeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await apiService.getChangeLogs();
        const list: ChangeLog[] = Array.isArray(res) ? res : res?.data || [];
        setLogs(list);
      } catch {
        setError('Failed to load activity.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return logs.filter(l => (l.editorDetails?.email || l.editorEmail) === email);
  }, [logs, email]);

  const created = filtered.filter(l => l.action === 'CREATE');
  const updated = filtered.filter(l => l.action === 'UPDATE');
  const deleted = filtered.filter(l => l.action === 'DELETE');

  const handleDeleteBlog = async (id?: string, title?: string) => {
    try {
      if (!id && !title) return;
      if (!window.confirm('Delete this blog?')) return;
      if (id) {
        await apiService.deleteBlog(id, { editorName: 'manager', editorEmail: 'manager@local' });
      }
      // If no id, we cannot reliably delete; skip silently
      setLogs(await apiService.getChangeLogs());
    } catch {
      // ignore
    }
  };

  const name = (filtered[0]?.editorDetails?.name || filtered[0]?.editorName || email.split('@')[0] || email);

  return (
    <div className="min-h-screen bg-gray-50 text-[13px] leading-5">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Activity for {email}</h1>
          <button onClick={() => navigate('/userpanel')} className="px-4 py-2 rounded-lg border">Back</button>
        </div>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        {loading ? (
          <div className="py-12 text-center text-gray-600">Loading…</div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-800">
              <span className="font-semibold">{name}</span> — {created.length} created • {updated.length} updated • {deleted.length} deleted
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Created Titles</h2>
                {created.length === 0 ? (
                  <p className="text-xs text-gray-500">No created titles.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {created.map(c => (
                      <li key={c._id} className="flex items-center justify-between">
                        <span>{c.blogId?.title || 'Unknown'} <span className="text-gray-500">({new Date(c.timestamp).toLocaleString()})</span></span>
                        <button onClick={() => handleDeleteBlog(c.blogId?._id, c.blogId?.title)} className="px-2 py-0.5 text-xs rounded border border-red-300 text-red-700 hover:bg-red-50">Delete</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white rounded-xl border p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Updated Titles</h2>
                {updated.length === 0 ? (
                  <p className="text-xs text-gray-500">No updated titles.</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {updated.map(u => (
                      <li key={u._id} className="flex items-center justify-between">
                        <span>{u.blogId?.title || 'Unknown'} <span className="text-gray-500">({new Date(u.timestamp).toLocaleString()})</span></span>
                        <button onClick={() => handleDeleteBlog(u.blogId?._id, u.blogId?.title)} className="px-2 py-0.5 text-xs rounded border border-red-300 text-red-700 hover:bg-red-50">Delete</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserActivityView;


