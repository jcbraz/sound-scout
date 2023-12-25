import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectPlaylist } from "@/db/schema";
import Link from "next/link";

type HistoryTableProps = {
  playlists: SelectPlaylist[] | null;
};

const HistoryTable = (props: HistoryTableProps) => {
  if (!props.playlists) {
    return (
      <Table className="lg:mt-20 mt-10">
        <TableCaption className="lg:text-lg text-sm italic">
          Your playlist history is empty!
        </TableCaption>
      </Table>
    );
  }

  return (
    <Table className="lg:text-base text-xs">
      <TableCaption>Your playlist history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Link</TableHead>
          <TableHead>Prompt</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.playlists.map((playlist) => (
          <TableRow key={playlist.id}>
            <TableCell>
              <Button
                className="lg:text-base text-xs text-transparent bg-clip-text bg-gradient-to-r from-c_green to-neutral-100"
                type="button"
                variant="link"
              >
                <Link
                  href={`https://open.spotify.com/playlist/${playlist.id}`}
                  target="_blank"
                >
                  Open it on Spotify
                </Link>
              </Button>
            </TableCell>
            <TableCell>{playlist.prompt}</TableCell>
            <TableCell>
              {playlist.created_at ? playlist.created_at.toString() : "No data"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HistoryTable;
