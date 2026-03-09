"use client";

import { SnippetType } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface SnippetFormData {
  title: string;
  content: string;
  tags: string;
  type: SnippetType;
}

export interface SnippetSubmitData {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

interface SnippetFormProps {
  initialData?: SnippetFormData;
  onSubmit: (data: SnippetSubmitData) => Promise<void>;
  heading: string;
  submitLabel: string;
  submittingLabel: string;
  error: string;
  setError: (error: string) => void;
}

export function SnippetForm({
  initialData,
  onSubmit,
  heading,
  submitLabel,
  submittingLabel,
  error,
  setError,
}: SnippetFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [tags, setTags] = useState(initialData?.tags ?? '');
  const [type, setType] = useState<SnippetType>(initialData?.type ?? 'note');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setSubmitting(true);

    try {
      const tagArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        tags: tagArray,
        type,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200 font-medium">
          {error}
        </div>
      )}

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
            placeholder="E.g., Useful Git commands"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type *
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as SnippetType)}
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
            placeholder="e.g., git, terminal, workflow"
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
            placeholder="Your snippet content goes here..."
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
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {submitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export function SnippetFormSkeleton({ heading }: { heading: string }) {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>
      <div className="space-y-6">
        <div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-9 w-full bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        </div>

        <div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-9 w-full bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        </div>

        <div>
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-9 w-full bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        </div>

        <div>
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-48 w-full bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        </div>

        <div className="flex justify-end gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="h-9 w-20 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
