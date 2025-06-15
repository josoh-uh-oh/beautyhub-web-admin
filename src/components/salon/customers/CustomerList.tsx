
import React, { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import CustomerDialog from "./CustomerDialog";
import { Button } from "@/components/ui/button";

export const CustomerList = () => {
  const { customers, setSearch, search } = useCustomers();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="検索: 名前・ふりがな・電話・Email"
        />
        <Button variant="default">+ 新規顧客</Button>
      </div>
      <div className="bg-white rounded shadow border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-orange-50">
              <th className="p-2 font-medium">名前</th>
              <th className="p-2 font-medium">電話番号</th>
              <th className="p-2 font-medium">最終利用日</th>
              <th className="p-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.name}<div className="text-xs text-gray-400">{c.nameKana}</div></td>
                <td className="p-2">{c.phone || "—"}</td>
                <td className="p-2">{c.history?.[0]?.date || "—"}</td>
                <td className="p-2">
                  <Button size="sm" onClick={() => {setSelected(c); setModalOpen(true)}}>詳細</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomerDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        customer={selected}
      />
    </div>
  );
};
