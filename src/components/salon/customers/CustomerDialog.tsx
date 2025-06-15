
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Customer } from "@/types/customer";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export const CustomerDialog = ({ open, onOpenChange, customer }: Props) => {
  const [tab, setTab] = useState("overview");
  const { t } = useLanguage();

  const tabs = [
    { key: "overview", label: t("overviewTab") },
    { key: "history", label: t("historyTab") },
    { key: "photos", label: t("photosTab") },
    { key: "notes", label: t("notesTab") },
  ];

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>
            {customer.name} <span className="text-gray-500 ml-2">{customer.nameKana}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="pt-3">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex gap-4 border-b mb-4">
              {tabs.map(t => (
                <TabsTrigger key={t.key} value={t.key} className={tab === t.key ? "border-b-2 border-orange-400 font-bold" : ""}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-1 text-gray-500">{t('phoneEmailLabel')}</div>
                  <div>{customer.phone} / {customer.email ?? "—"}</div>
                  <div className="mt-2 text-gray-500">{t('addressLabel')}</div>
                  <div>{customer.address ?? "—"}</div>
                </div>
                <div>
                  <div className="mb-1 text-gray-500">{t('memberSinceLabel')}</div>
                  <div>{customer.memberSince ?? "—"}</div>
                  <div className="mt-2 text-gray-500">{t('tagsLabel')}</div>
                  <div>{(customer.tags || []).join(", ") || "—"}</div>
                </div>
              </div>
              <div className="mt-4">
                <KaruteSection karute={customer.karute} />
              </div>
            </TabsContent>

            <TabsContent value="history">
              <HistorySection history={customer.history ?? []} />
            </TabsContent>

            <TabsContent value="photos">
              <PhotosSection photos={customer.photos ?? []} />
            </TabsContent>

            <TabsContent value="notes">
              <NotesSection notes={customer.notes ?? []} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Individual tab sections:
const KaruteSection = ({ karute }: { karute?: any }) => {
  const { t } = useLanguage();
  if (!karute) return <div className="text-gray-400">{t('noKaruteInfo')}</div>;
  return (
    <div className="border border-orange-100 rounded p-3 bg-orange-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-2">
        <div><span className="text-xs text-gray-500">{t('karuteAllergies')}</span><br/>{karute.allergies || "—"}</div>
        <div><span className="text-xs text-gray-500">{t('karuteHairType')}</span><br/>{karute.hairType || "—"}</div>
        <div><span className="text-xs text-gray-500">{t('karuteScalpCondition')}</span><br/>{karute.scalpCondition || "—"}</div>
        <div><span className="text-xs text-gray-500">{t('karuteSkinType')}</span><br/>{karute.skinType || "—"}</div>
      </div>
      <div className="mt-2 text-xs text-gray-400">{t('karuteMemo')}: {karute.memo || "—"}</div>
    </div>
  );
};

const HistorySection = ({ history }: { history: any[] }) => {
  const { t } = useLanguage();
  return (
  <div>
    {history.length === 0 ? <div className="text-gray-400">{t('historyEmpty')}</div> : (
      <ul className="divide-y">
        {history.map(h => (
          <li key={h.id} className="py-2">
            <div className="font-semibold">{h.service}</div>
            <div className="text-xs text-gray-500">{h.date} / {t('historyStaff')}: {h.staff}</div>
            {h.notes && <div className="mt-1 text-sm">{h.notes}</div>}
          </li>
        ))}
      </ul>
    )}
  </div>
)};

const PhotosSection = ({ photos }: { photos: any[] }) => {
  const { t } = useLanguage();
  return (
  <div>
    {photos.length === 0 ? (
      <div className="text-gray-400">{t('noPhotos')}</div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {photos.map((p) => (
          <div key={p.id} className="rounded border overflow-hidden">
            <img src={p.url} alt={p.description || "photo"} className="object-cover w-full h-24" />
            <div className="p-1 text-xs text-gray-500">{p.date} {p.type && `(${p.type})`}</div>
          </div>
        ))}
      </div>
    )}
  </div>
)};

const NotesSection = ({ notes }: { notes: any[] }) => {
  const { t } = useLanguage();
  return (
  <div>
    {notes.length === 0 ? (
      <div className="text-gray-400">{t('noNotes')}</div>
    ) : (
      <ul>
        {notes.map((n) => (
          <li key={n.id} className="border mb-2 p-2 rounded">
            <div className="text-xs text-gray-500">{n.date} / {n.author}</div>
            <div>{n.content}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
)};

export default CustomerDialog;
