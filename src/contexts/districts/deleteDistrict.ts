import { database } from "@/firebase";

export async function deleteDistrict(id: string) {
  await database.ref(`admin/districts/${id}`).remove();
}
