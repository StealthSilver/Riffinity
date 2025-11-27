export function cn(...inputs: string[]): string {
    return inputs.filter(Boolean).join(' ');
  }
  