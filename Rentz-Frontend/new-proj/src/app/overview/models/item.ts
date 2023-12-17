export interface Item {
  id: string;
  title: string;
  description: string;
  picture1Base64: string;
  picture2Base64: string;
  picture3Base64: string;
  pricePerDay: number;
  ownerId: string;
  itemType: string;
  reservationDates: Date[];
}
