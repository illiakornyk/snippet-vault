'use client';

import { api } from '@/lib/api';
import { SnippetForm, SnippetSubmitData } from '@/components/SnippetForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateSnippet() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleCreate = async (data: SnippetSubmitData) => {
    await api.createSnippet(data);
    router.push('/');
    router.refresh();
  };

  return (
    <SnippetForm
      heading="Create New Snippet"
      submitLabel="Create Snippet"
      submittingLabel="Creating..."
      onSubmit={handleCreate}
      error={error}
      setError={setError}
    />
  );
}
