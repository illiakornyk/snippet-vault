"use client";

import { api, Snippet } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSnippet({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [id, setId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState<Snippet['type']>('note');

  useEffect(() => {
    async function loadSnippet() {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        const snippet = await api.getSnippet(resolvedParams.id);
        setTitle(snippet.title);
        setContent(snippet.content);
        setTags(snippet.tags ? snippet.tags.join(', ') : '');
        setType(snippet.type as Snippet['type']);
      } catch (err: unknown) {
        setError('Failed to load snippet for editing. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    }
    loadSnippet();
  }, [params]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError('');

    if (!id) return;

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setSaving(true);

    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await api.updateSnippet(id, {
        title: title.trim(),
        content: content.trim(),
        tags: tagArray,
        type,
      });

      router.push(`/snippet/${id}`);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update snippet';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Snippet</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200 font-medium">
          {error}
        </div>
      )}

      {!error && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type *
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Snippet['type'])}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              required
            >
              <option value="note">Note</option>
              <option value="link">Link</option>
              <option value="command">Command</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 font-mono"
              required
            />
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
