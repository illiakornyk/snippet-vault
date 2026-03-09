const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/snippets';

export type SnippetType = 'link' | 'note' | 'command';

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSnippets {
  data: Snippet[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const api = {
  async getSnippets(params?: {
    q?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }) {
    const url = new URL(API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || 'Failed to fetch snippets');
    }
    return response.json() as Promise<PaginatedSnippets>;
  },

  async getSnippet(id: string) {
    const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || `Failed to fetch snippet ${id}`);
    }
    return response.json() as Promise<Snippet>;
  },

  async createSnippet(data: Partial<Snippet>) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || 'Failed to create snippet');
    }
    return response.json() as Promise<Snippet>;
  },

  async updateSnippet(id: string, data: Partial<Snippet>) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || `Failed to update snippet ${id}`);
    }
    return response.json() as Promise<Snippet>;
  },

  async deleteSnippet(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || `Failed to delete snippet ${id}`);
    }
    return response.json() as Promise<Snippet>;
  },
};
