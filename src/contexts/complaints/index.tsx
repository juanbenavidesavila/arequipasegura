import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Complaint, EntityType, PaginatioContext, Pagination } from "@alerta-ciudadana/entity";
import { createContext } from "@/utils";
import removeAccents from "remove-accents";

import { database, storage } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";
import moment from "moment";

const cookies = new Cookies();

interface ComplaintContext extends PaginatioContext<any> {
  typesOfComplaints: any[];
  complaints: any[];
  sortTable: (sort: "asc" | "desc", field: keyof any) => void;
  createComplaintType(values: { name: string; icon: File }): Promise<void>;
  deleteComplaintType(entity: any): Promise<void>;
  filterComplaintsByType(name?: string): void;
  filterByDates(startDate: string, endDate: string): void;
  changeStatus(complaint: any, status: string): Promise<void>;
  addingMessage(complaint: any, message: string): Promise<void>;
  complaintLengths: number;
  newComplaint: { complaint?: Complaint; attending: boolean };
  newComplaintDetected: boolean;
  setComplaintLengths: (length: number) => void;
  setNewComplaint: (complaint: { complaint?: Complaint; attending: boolean }) => void;
  setNewComplaintDetected: (detected: boolean) => void;
}

const ComplaintContext = createContext<ComplaintContext>();

const ComplaintProvider: FC = ({ children }) => {
  // const { isAuthenticated } = useAuthContext();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [allComplaints, setAllComplaints] = useState<any[]>([]);
  const [typesOfComplaints, setTypesOfComplaints] = useState<any[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: complaints,
    name: "complaint",
  });
  const [complaintLengths, setComplaintLengths] = useState(0);
  const [newComplaint, setNewComplaint] = useState<{ complaint?: Complaint; attending: boolean }>({
    complaint: undefined,
    attending: false,
  });
  const [newComplaintDetected, setNewComplaintDetected] = useState(false);



  const districtId = useMemo(() => cookies.get("district_id"), []);
  const type = useMemo(() => cookies.get("type"), []);

  let firebasePath = `district/${districtId}/complaint`

  if(type == "arequipa"){
    firebasePath= `PNP/Denuncias`
  }
  function getComplaints() {
    const districtId = cookies.get("district_id");
    database.ref(firebasePath).on("value", (snapshot) => {
      let districtsSnapshot = snapshot.val();
     
        districtsSnapshot = Object.keys(districtsSnapshot || {})
        .map((key) => {
          let districts = (Object.entries(districtsSnapshot[key]) as any).map(([id, value]: any) => ({
            ...value,
            id,
            userId: key,
          }));

          return districts;
        })
        .flat();

        if(districtsSnapshot){

          setComplaints(districtsSnapshot);
          setAllComplaints(districtsSnapshot);
        }
      
  
    });
  }
  let firebasePath2 = `district/${districtId}/tDenuncia`

  if(type == "arequipa"){
    firebasePath2= `PNP/Denuncias`
  }
  function getTypesOfComplaints() {
    database.ref(firebasePath2).on("value", (snapshot) => {
      let typesOfComplaints = snapshot.val() || [];

      typesOfComplaints = Object.keys(typesOfComplaints).map((key) => ({
        id: key,
        ...typesOfComplaints[key],
      }));

      setTypesOfComplaints(typesOfComplaints);
    });
  }

  async function createComplaintType(values: { name: string; icon: File }) {
    const name = removeAccents(values.name.toLowerCase().replace(/ /g, "_"));
    await storage.ref(`complaint-types/${name}`).put(values.icon);

    await database.ref(firebasePath2).push({
      name: values.name,
      icon: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/complaint-types%2F${name}?alt=media`,
    });
  }

  async function deleteComplaintType(entity: EntityType) {
    const name = removeAccents(entity.name.toLowerCase().replace(/ /g, "_"));
    await database.ref(`${firebasePath2}/${entity.id}`).remove();
    await storage.ref(`complaint-types/${name}`).delete();
  }

  async function sortTable(sort: "asc" | "desc", field: keyof any) {
    const sortedComplaints = [...complaints].sort((a, b) => {
      if (sort === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] > b[field] ? -1 : 1;
      }
    });

    setComplaints(sortedComplaints);
  }

  async function filterComplaintsByType(complaintType: string) {
    if (!complaintType) {
      setComplaints(allComplaints);
      return;
    }
    const emergenciesFinded = allComplaints.filter((e) => e.type === complaintType);
    setComplaints(emergenciesFinded);
  }

  async function filterByDates(startDate: string, endDate: string) {
    const emergenciesFinded = allComplaints.filter((e) => {
      const compareDate = moment(e.date);
      const startDateCompare = moment(startDate).subtract(1, "days");
      const endDateCompare = moment(endDate);
      return compareDate.isBetween(startDateCompare, endDateCompare);
    });
    setComplaints(emergenciesFinded);
  }

  let firebasePath3 = `district/${districtId}/complaint/`

  if(type == "arequipa"){
    firebasePath3= `PNP/Denuncias`
  }

  async function changeStatus(complaint: Complaint, estado: string) {
    await database.ref(`${firebasePath3}/${complaint.userId}/${complaint.id}`).update({ estado });
  }

  async function addingMessage(complaint: Complaint, message: string) {
    await database.ref(`${firebasePath3}/${complaint.userId}/${complaint.id}`).update({ message });
  }


  useEffect(() => {
    const audio = new Audio('/denuncia_alert.mp3');
  
    const countComplaints = complaints.filter((complaint) => complaint?.activator).length;
    if (complaintLengths < countComplaints) {
      if (countComplaints > 0) {
        setNewComplaint({ complaint: complaints[0], attending: false });
        setNewComplaintDetected(true);
        audio.play();

      }
    }
    if (countComplaints === 0) {
      setNewComplaint({ complaint: undefined, attending: false });
      setNewComplaintDetected(false);
    }
  
    setComplaintLengths(countComplaints);
  }, [complaints]);
  

  
  useEffect(() => {
    getComplaints();
    getTypesOfComplaints();
  }, []);

  return (
    <ComplaintContext.Provider
      value=({
        complaints,
        typesOfComplaints,
        createComplaintType,
        deleteComplaintType,
        sortTable,
        filterComplaintsByType,
        filterByDates,
        changeStatus,
        addingMessage,
        newComplaintDetected, 
        newComplaint,
        setNewComplaint, 
        setNewComplaintDetected 
      })>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaintContext = () => useContext(ComplaintContext);

export default ComplaintProvider;
