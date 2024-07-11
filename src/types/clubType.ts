export type ClubType = {
  club_id: string;
  club_name: string;
  classification: string;
  club_poster: string;
  club_master: string;
  teacher: string;
  description: string;
  st_date: Date | string;
  end_date: Date | string;
};

export type UpdateClubType = {
  club_name: string;
  club_master: string;
  teacher: string;
  description: string;
  st_date: Date | string | undefined;
  end_date: Date | string | undefined;
};
