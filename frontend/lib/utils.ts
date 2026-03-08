export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function getStringParam(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export function getIntParam(value: string | string[] | undefined, fallback: number): number {
  return typeof value === 'string' ? parseInt(value, 10) : fallback;
}
