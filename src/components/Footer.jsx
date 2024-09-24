import { SendIcon, SendToBack, SendToBackIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="border-t">
      <div className="base-container flex items-center justify-center py-3">
        <div className="flex items-center gap-1">
          <a
            className="font-medium tracking-wide hover:underline"
            target="blank"
            href="https://t.me/ozodbekweb"
          >
            Taklif va shikoyatlar bo'yicha 
          </a>
          <SendToBack/>
        </div>
      </div>
    </div>
  );
}
