import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function LoveList() {
  const list = [
    {
      name: "🚙 旅行",
      cover: "/the-fall-in-summer.webp",
    },
    {
      name: "Kotlin💖",
      file: "/kotlin.svg",
      links: [
        {name: "AzisabaNetwork/SpicyAzisaBan", href: "https://github.com/AzisabaNetwork/SpicyAzisaBan"},
        {name: "AzisabaNetwork/api", href: "https://github.com/AzisabaNetwork/api"},
      ],
    },
    {
      name: "React",
      file: "/react.svg",
      links: [
        {name: "acrylic-style/acrylicstyle.xyz", href: "https://github.com/acrylic-style/acrylicstyle.xyz"},
      ],
      cover: "/2025-07-24_22.06.51_4K.webp",
    },
    {
      name: "☕ Java",
      links: [
        {name: "BlueberryMC/NativeUtil", href: "https://github.com/BlueberryMC/NativeUtil"},
        {name: "BlueberryMC/Blueberry", href: "https://github.com/BlueberryMC/Blueberry/tree/dev/1.20.6"},
        {name: "AzisabaNetwork/Kuvel (一部)", href: "https://github.com/AzisabaNetwork/Kuvel"},
        {name: "AzisabaNetwork/LifeCore", href: "https://github.com/AzisabaNetwork/LifeCore"},
        {name: "他にもAzisabaNetwork内のいろいろ", href: "https://github.com/AzisabaNetwork"},
      ],
    },
    {
      name: "⚙ Rust",
      description: "まだ公開できるものがひとつしかないです... :(",
      links: [
        {name: "BlueberryMC/ws-tcp-proxy", href: "https://github.com/BlueberryMC/ws-tcp-proxy"},
      ],
    },
    {
      name: "TypeScript",
      file: "/typescript.svg",
      links: [
        {name: "azisaba/discord-chat-sync", href: "https://github.com/azisaba/discord-chat-sync"},
        {name: "acrylic-style/train-location-and-visitors-server", href: "https://github.com/acrylic-style/train-location-and-visitors-server"},
      ],
    },
    {
      name: "✌ Vue",
      links: [
        {name: "azisaba/renewal-azisaba.net", href: "https://github.com/azisaba/renewal-azisaba.net"},
      ],
    },
  ]

  return (
    <div className="justify-center flex flex-col items-center w-full">
      <h2 className="text-xl">すきなこと：</h2>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {list.map(entry =>
          <Card key={entry.name} className="w-1/4 max-sm:w-full">
            <CardHeader>
              <CardTitle className="self-center flex gap-1 items-center">
                {entry.file && <Image height={16} width={16} alt={entry.file} src={entry.file} className="inline" />}
                <span>{entry.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {entry.description}
              {entry.links &&
                <ul className="list-disc">
                  {entry.links.map(link =>
                    <li key={link.href}>
                      <a href={link.href} className="text-primary">{link.name || link.href}</a>
                    </li>)
                  }
                </ul>
              }
              {entry.cover &&
                <Link href={entry.cover} target="_blank">
                  <Image alt={entry.cover} src={entry.cover} height={100} width={100} className="w-full rounded-xl object-cover" />
                </Link>
              }
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}