
export interface CustomerKarute {
  allergies?: string;
  hairType?: string;
  scalpCondition?: string;
  skinType?: string;
  memo?: string;
  [key: string]: string | undefined;
}

export interface CustomerPhoto {
  id: string;
  url: string;
  date: string; // ISO
  description?: string;
  type?: "before" | "after" | "other";
}

export interface CustomerHistoryItem {
  id: string;
  date: string; // ISO
  service: string;
  staff: string;
  notes?: string;
}

export interface CustomerNote {
  id: string;
  author: string;
  date: string; // ISO
  content: string;
  category?: string;
}

export interface Customer {
  id: string;
  name: string;
  nameKana?: string;
  gender?: string;
  birthday?: string; // ISO
  phone?: string;
  email?: string;
  address?: string;
  memberSince?: string; // ISO
  tags?: string[];
  karute?: CustomerKarute;
  notes?: CustomerNote[];
  photos?: CustomerPhoto[];
  history?: CustomerHistoryItem[];
}
