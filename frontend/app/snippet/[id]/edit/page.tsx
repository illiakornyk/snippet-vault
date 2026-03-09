"use client";

import { api, Snippet, SnippetType } from '@/lib/api';
import { SnippetForm, SnippetFormData, SnippetSubmitData, SnippetFormSkeleton } from '@/components/SnippetForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSnippet({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [id, setId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<SnippetFormData | undefined>();

  useEffect(() => {
    async function loadSnippet() {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        const snippet = await api.getSnippet(resolvedParams.id);
        setInitialData({
          title: snippet.title,
          content: snippet.content,
          tags: snippet.tags ? snippet.tags.join(', ') : '',
          type: snippet.type as Snippet['type'],
        });
      } catch (err: unknown) {
        setError('Failed to load snippet for editing. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    }
    loadSnippet();
  }, [params]);

  const handleUpdate = async (data: SnippetSubmitData) => {
    if (!id) return;
    await api.updateSnippet(id, data);
    router.push(`/snippet/${id}`);
    router.refresh();
  };

  if (loading) {
    return <SnippetFormSkeleton heading="Edit Snippet" />;
  }

  return (
    <SnippetForm
      heading="Edit Snippet"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      initialData={initialData}
      onSubmit={handleUpdate}
      error={error}
      setError={setError}
    />
  );
}
