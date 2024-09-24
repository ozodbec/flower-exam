import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants, Button } from "@/components/ui/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { PlusCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "../request";
import { ImageSize } from "../lib/my-utils";
import { toast } from "sonner";

export default function UploadImage({ outsideImg }) {
  const [value, setValue] = useState(outsideImg ? outsideImg : "");
  const urlInput = useRef(null);

  const handleUploadImage = (image, type = "local") => {
    if (type === "url") {
      setValue(image);
    } else {
      if (image.size >= ImageSize) {
        toast.error("Rasm hajmi 5 mbdan kichik bo'lishi kerak!");
      } else {
        toast.loading("Rasm yuklanmoqda...");
        uploadImage(image)
          .then((res) => {
            setValue(res);
          })
          .catch(({ message }) => {
            toast.error(message);
          });
      }
    }
  };

  return (
    <div className="mb-10 w-full px-1">
      <input
        value={value}
        onChange={setValue}
        type="url"
        name="imageUrl"
        className="sr-only"
      />

      <Label className="ml-2">Rasim Yuklang..</Label>
      <Tabs defaultValue="local" className="mb-2 w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="local">
            Local
          </TabsTrigger>
          <TabsTrigger className="w-full" value="url">
            URL
          </TabsTrigger>
          <TabsTrigger className="w-full" value="default">
            Default
          </TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <Label>
            <span
              className={`w-full py-1 ${buttonVariants({ variant: "outline" })}`}
            >
              {!value ? <PlusCircleIcon /> : <UpdateIcon />}
            </span>
            <Input
              onChange={({ target: { files } }) => handleUploadImage(files[0])}
              accept="image/*"
              className="sr-only"
              type="file"
            />
          </Label>
        </TabsContent>
        <TabsContent value="url">
          <Label htmlFor="url" className="mb-1 ml-2">
            Havola*
          </Label>
          <div className="flex items-center gap-5">
            <Input
              ref={urlInput}
              id="url"
              placeholder=" Rasimni havolasini kiriting"
              className="w-full"
              type="url"
            />

            <Button
              onClick={() => handleUploadImage(urlInput?.current.value, "url")}
              type="button"
            >
              {!value ? <PlusIcon /> : <UpdateIcon />}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="default">
          <Button
            className="w-full"
            type="button"
            onClick={() =>
              setValue(
                "https://www.creativefabrica.com/wp-content/uploads/2022/02/18/Winter-Nature-Flower-Icon-Black-Graphics-25457747-1.png",
              )
            }
          >
            <PlusCircleIcon />{" "}
          </Button>
        </TabsContent>
      </Tabs>
      {value && (
        <img
          onLoad={() => {
            toast.dismiss();
            toast.success("Rasm muvaffaqiyatli yuklandi");
          }}
          onError={() => {
            toast.warning(
              "Rasmni yuklashni imkoni bo'lmadi, qaytadan urinib ko'ring!",
            );
            setValue(
              "https://www.creativefabrica.com/wp-content/uploads/2022/02/18/Winter-Nature-Flower-Icon-Black-Graphics-25457747-1.png",
            );
          }}
          className="!h-52 !w-full rounded-xl bg-top object-cover"
          src={value}
          value={value}
          name="imageUrl"
        />
      )}
    </div>
  );
}
