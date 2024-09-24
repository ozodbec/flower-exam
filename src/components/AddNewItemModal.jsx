import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFormData, validation } from "../lib/my-utils/index";
import { useAppStore } from "../lib/zustand";
import SelectCategory from "./SelectCategory";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UploadImage from "./UploadImage";
import { toast } from "sonner";
import Summaries from "./Summaries";
import { refreshToken, sendFlower } from "../request";
import { useEffect, useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function AddNewItemModal({ sendingData, setSendingData }) {
  const [loading, setLoading] = useState(false);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validation(result);
    if (checker) {
      toast.warning(errorMessage);
    } else {
      setSendingData(result);
      console.log(result);
    }
  };

  useEffect(() => {
    if (sendingData) {
      setLoading(true);
      sendFlower(admin?.access_token, sendingData)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setSendingData(null);
          setAddItemModal();
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(() => {
                toast.info("Tizimga qayta kiring");
                setAdmin(null);
              });
          }
          toast.error(message);
        })
        .finally(() => setLoading(false));
    }
  }, [admin, sendingData]);

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Ma'lumot qo'shish</DialogTitle>
          <DialogDescription>
            Bo'sh joylarga to'g'ri ma'lumot kiritish orqali yangi ma'lumot
            qo'shishingiz mumkin!
          </DialogDescription>
          <form className="" onSubmit={handleSubmit}>
            <div className="max-h-96 overflow-x-hidden overflow-y-scroll px-2">
              <div className="mb-3">
                <Label htmlFor="name" className="ml-2">
                  Gul nomi*
                </Label>
                <Input
                  id="name"
                  placeholder="Gul nomini kiriting..."
                  name="name"
                />
              </div>
              <div className="mb-3">
                <Label htmlFor="price" className="ml-2">
                  Narxi (so'm)*
                </Label>
                <Input
                  id="price"
                  placeholder="Gul narxini kiriting..."
                  name="price"
                  type="number"
                />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <SelectCategory />
                <SelectColor />
              </div>

              <div className="relative mb-3">
                <SelectCountry />
              </div>
              <div>
                <Summaries />
              </div>
              <div className="mb-3">
                <Label className="ml-2" htmlFor="smell">
                  Hid*
                </Label>
                <Input
                  name="smell"
                  type="text"
                  id="smell"
                  placeholder="Gul hidini kiriting..."
                />
              </div>
              <div>
                <LifeTime />
              </div>
              <div className="w-full">
                <UploadImage />
              </div>
            </div>
            <div className="flex w-full justify-end gap-5 px-5">
              <Button onClick={setAddItemModal} variant="outline" type="button">
                Bekor qilish
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  "Tasdiqlash"
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
