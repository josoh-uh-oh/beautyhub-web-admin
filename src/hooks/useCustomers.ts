
import { useState } from "react";
import { Customer } from "@/types/customer";

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "山田 花子",
    nameKana: "やまだ はなこ",
    gender: "女性",
    birthday: "1991-04-02",
    phone: "080-1234-5678",
    email: "hanako@example.com",
    address: "東京都渋谷区1-1-1",
    memberSince: "2021-07-10",
    tags: ["VIP"],
    karute: {
      allergies: "花粉",
      hairType: "直毛",
      scalpCondition: "乾燥気味",
      skinType: "敏感肌",
      memo: "香料に敏感／夏はショート希望",
    },
    notes: [
      {
        id: "n1",
        author: "鈴木",
        date: "2024-04-12",
        content: "新しいケア商品に興味あり",
        category: "General"
      }
    ],
    photos: [],
    history: [
      {
        id: "h1",
        date: "2024-04-10",
        service: "カット・カラー",
        staff: "佐藤",
        notes: "良好"
      }
    ]
  },
  // ... more demo customers
];

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [{ ...customer, id: Date.now() + "" }, ...prev]);
  };

  const updateCustomer = (id: string, partial: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...partial } : c))
    );
  };

  const removeCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const filtered = customers.filter((c) =>
    c.name.includes(search) ||
    c.nameKana?.includes(search) ||
    c.phone?.includes(search) ||
    c.email?.includes(search)
  );

  return {
    customers: filtered,
    setSearch,
    search,
    addCustomer,
    updateCustomer,
    removeCustomer,
  };
}
