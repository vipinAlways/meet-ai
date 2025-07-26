import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { MeetingStatus } from "~/lib/type";

export const useMeetingFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
    status:parseAsStringEnum(Object.values(MeetingStatus)),
    agentId:parseAsString.withDefault("").withOptions({clearOnDefault:true})
  });
};
