export type FetchUserRoomsAndParticipantsResponse = {
  roomId: string;
  roomOwner: string;
  mandalart: {
    id: string;
    title: string;
    subTitle: string;
    color: number;
    createdAt: string;
    doneCount: number;
    private: boolean;
    startDate: Date;
    endDate: Date;
  };
  participants: {
    participantId: string;
    userId: string;
    role: string;
    createdAt: string;
    nickname: string;
    email: string;
    profileUrl: string;
  }[];
};

export type DateRangeState = {
  startYear: string;
  startMonth: string;
  startDay: string;
  endYear: string;
  endMonth: string;
  endDay: string;
};

export type ColorMutationParams = {
  mandalartId: string;
  colorId: number;
};
