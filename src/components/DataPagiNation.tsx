import React from "react";
import { Button } from "./ui/button";

interface Props {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}
const DataPagiNation = ({ page, onPageChange, totalPage }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {page} of {totalPage || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === totalPage || totalPage === 0}
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="cursor-pointer "
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPage || totalPage === 0}
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.max(1, page + 1))}
          className="cursor-pointer "
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataPagiNation;
