import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";
import generateAvatatUri from "~/lib/avatar";
import { formatDate } from "date-fns";

const Transcript = ({ meetingId }: { meetingId: string }) => {
  const [searchQery, setSearchQuery] = useState<string>("");
  const { data, isPending } = api.meetings.getTranscript.useQuery({
    id: meetingId,
  });
  const filterData =
    data &&
    data.filter((item) =>
      item.text.toString().toLowerCase().includes(searchQery.toLowerCase()),
    );
  return (
    <div className="flex w-full flex-col gap-y-4 rounded-lg border bg-white px-4 py-5">
      <p className="text-sm font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search Transcript"
          className="h-9 w-[240px] pl-7"
          value={searchQery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filterData?.map((item) => (
            <div
              key={item.start_ts}
              className="hover:bg-muted flex flex-col gap-y-2 rounded-md border py-4"
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={
                      item.user.image ??
                      generateAvatatUri({
                        seed: item.user.name!,
                        variant: "initials",
                      })
                    }
                    alt="User Avatar"
                  ></AvatarImage>
                </Avatar>

                <p className="text-sm font-semibold">{item.user.name}</p>
                <div className="text-sm text-blue-500">
                  {formatDate(
                    new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                    "mm:ss",
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Transcript;
