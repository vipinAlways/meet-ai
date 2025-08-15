'use client';

import { type ColumnDef } from '@tanstack/react-table';
import type { MeetingGetMAny } from '~/lib/type';
import { format } from 'date-fns';
import humanizeDuration from 'humanize-duration';
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerRightDownIcon,
  LoaderIcon,
} from 'lucide-react';

import GeneratedAvatar from '~/components/GeneratedAvatar';
import { Badge } from '~/components/ui/badge';
import { cn, formateDuration } from '~/lib/utils';

const statusIconMap = {
  UPCOMING: ClockArrowUpIcon,
  ACTIVE: LoaderIcon,
  COMPLETED: CircleCheckIcon,
  PROCESSING: LoaderIcon,
  CANCELLED: CircleXIcon,
};

const statusColorMap = {
  UPCOMING: 'bg-yellow-500/20 text-yellow-800 border-yellow-800/5',
  ACTIVE: 'bg-blue-500/20 text-blue-800 border-blue-800/5',
  COMPLETED: 'bg-emerald-500/20 text-emerald-800 border-emerald-800/5',
  PROCESSING: 'bg-gray300/20 text-gray-800 border-gray-800/5',
  CANCELLED: 'bg-rose-500/20 text-rose-800 border-rose-800/5',
};

export const Meetingcolumns: ColumnDef<
  MeetingGetMAny['items'][number] | MeetingGetMAny['duration'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Meeting Name',
    cell: ({ row }) => {
      return (
        <div className='flex flex-col gap-y-1 cursor-pointer'>
          <span className='font-semibold capitalize'>{row.original.name}</span>
          <div className='flex items-center gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <CornerRightDownIcon className='text-muted-foreground size-3' />
              <span className='text-muted-foreground max-w-[200px] truncate text-sm capitalize'>
                {row.original.agent.name!}
              </span>
            </div>
            <GeneratedAvatar
              variant='bottsNeutral'
              seed={row.original.name}
              className='size-4'
            />
            <span className='font-semibold capitalize'>
              {row.original.startedAt
                ? format(row.original.startedAt, 'MM/d')
                : '}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'meetingCount',
    header: 'Meetings',
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusColorMap];
      return (
        <Badge
          variant={'outline'}
          className={cn(
            'flex items-center gap-x-2 [&svg]:size-4',
            statusColorMap[row.original.status as keyof typeof statusColorMap],
          )}
        >
          <Icon
            className={cn(
              row.original.status === 'PROCESSING' && 'animate-spin',
            )}
          />
          {/* {row.original.meetingCount} {row.original.meetingCount === 1 ? 'Meeting' : 'Meetings'} */}
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      return (
        <Badge
          variant='outline'
          className={cn('flex items-center gap-x-2 [&svg]:size-4')}
        >
          <ClockFadingIcon className='text-blue-700' />
          {'duration' in row.original && row.original.duration != null
            ? formateDuration(row.original.duration)
            : 'No duration'}
        </Badge>
      );
    },
  },
];
