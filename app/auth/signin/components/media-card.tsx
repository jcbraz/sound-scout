import { Card } from "@/components/ui/card";
import Image from "next/image";

type MediaCardProps = {
  step: number;
  src: string;
  type: "image" | "video";
};

const MediaCard = (props: MediaCardProps) => {
  return (
    <Card className="border-2 border-c_grey relative w-full h-full">
      {props.type === "image" ? (
        <Image
          alt={`Workflow Step ${props.step}`}
          src={props.src}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
        />
      ) : (
        <video autoPlay className="w-full h-full" loop muted>
          {/* <source src={props.src} type="video/mp4" />
            <source src={props.src} type="video/ogg" /> */}
          <source src={props.src} type="video/webm" />
        </video>
      )}
    </Card>
  );
};

export default MediaCard;
